import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { debounce } from 'lodash'
import RingLoader from 'react-spinners/RingLoader'


function JobList() {

  const [jobs, updateJobs] = useState([])
  const [filter, updateFilter] = useState('')
  const [loading, updateLoading] = useState(true)

  const debouncedSave = debounce((query, updateJobs) => {
    axios.get(`https://rickandmortyapi.com/api/job/?name=${query}`)
      .then(({ data }) => {
        updateJobs(data.results)
        updateLoading(false)
      })
  }, 500)

  useEffect(() => {
    debouncedSave(filter, updateJobs)
  }, [filter])

  if (loading) {
    return <div className="container has-text-centered mt-6">
      <RingLoader loading={loading} size={80} color={'aqua'}/>
    </div>
  }

  return <div>
    <div>
      <input
        type="text"
        className="input"
        placeholder="Enter job name.."
        onChange={(event) => updateFilter(event.target.value)}
        value={filter}
      />
    </div>
    <div className="section">
      <div className="container">
        <div className="columns is-multiline">
          {jobs.map(job => {
            return <Link key={job.id} to={`/job/${job.id}`}>
              <div className="card m-3">
                <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                      <h2 className="title is-4">
                        {job.name.length >= 18
                          ? job.name.slice(0, 18) + '...'
                          : job.name
                        }
                      </h2>
                      <h2 className="subtitle is-5">
                        {job.species}
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="card-image">
                  <figure className="image is-3by3">
                    <img src={job.image} alt={job.name} />
                  </figure>
                </div>
              </div>
            </Link>
          })}
        </div>
      </div>
    </div>
    <footer className="pagination m-5" role="navigation" aria-label="pagination">
      <a className="pagination-previous" title="This is the first page" disabled>Previous</a>
      <a className="pagination-next">Next page</a>
      <ul className="pagination-list">
        <li>
          <a className="pagination-link is-current" aria-label="Page 1" aria-current="page">1</a>
        </li>
        <li>
          <a className="pagination-link" aria-label="Goto page 2">2</a>
        </li>
        <li>
          <a className="pagination-link" aria-label="Goto page 3">3</a>
        </li>
      </ul>
    </footer>
  </div>
}

export default JobList