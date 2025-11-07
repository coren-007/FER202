 import NavigationHeader from '../components/NavigationHeader'
 import FilterBar from '../components/FilterBar'
 import PaymentTable from '../components/PaymentTable'
 import { Container } from 'react-bootstrap'
 import { usePayments } from '../contexts/PaymentContext'

 export default function DashboardPage() {
   const { fetchPayments, setFilters, setSort } = usePayments()

   const handleFilter = (f) => {
     setFilters(f)
     fetchPayments({ query: f.query, semester: f.semester, course: f.course })
   }
   const handleSort = (s) => {
     setSort(s)
     fetchPayments({ sortBy: s })
   }

   return (
     <>
       <NavigationHeader />
       <Container>
         <FilterBar onFilter={handleFilter} onSort={handleSort} />
         <PaymentTable />
       </Container>
     </>
   )
 }
