import Header from '../components/Header'
import FilterBar from '../components/FilterBar'
import PaymentList from '../components/PaymentList'
import { Container } from 'react-bootstrap'
import { useState } from 'react'

export default function DashboardPage() {
  const [filters, setFilters] = useState()
  const [sortBy, setSortBy] = useState()

  return (
    <>
      <Header />
      <Container className="mt-4">
        <h4 className="mb-3">Payment Dashboard</h4>
        <FilterBar onFilter={setFilters} onSort={setSortBy} />
        <PaymentList filters={filters} sortBy={sortBy} />
      </Container>
    </>
  )
}
