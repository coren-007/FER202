 import NavigationHeader from '../components/NavigationHeader'
import FilterBar from '../components/FilterBar'
import PaymentTable from '../components/PaymentTable'
import { Container } from 'react-bootstrap'
import { usePayments } from '../contexts/PaymentContext'

/**
 * Trang Dashboard: hiển thị header, thanh lọc và bảng payments.
 * Sử dụng PaymentContext để fetch dữ liệu, đặt filter/sort khi người dùng thao tác.
 */
export default function DashboardPage() {
  const { fetchPayments, setFilters, setSort } = usePayments()

  /**
   * Gửi filter lên context và tải lại dữ liệu.
   */
  const handleFilter = (f) => {
    setFilters(f)
    fetchPayments({ query: f.query, semester: f.semester, course: f.course })
  }

  /**
   * Gửi sortBy lên context và tải lại dữ liệu.
   */
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
