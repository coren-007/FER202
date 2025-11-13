 import NavigationHeader from '../components/NavigationHeader'
 import FilterBar from '../components/FilterBar'
 import ExpenseTable from '../components/ExpenseTable'
 import { Container, Card, Row, Col } from 'react-bootstrap'
 import { useexpenses } from '../contexts/PaymentContext'

/**
 * Trang Dashboard: hiển thị header, thanh lọc và bảng expenses.
 * Sử dụng PaymentContext để fetch dữ liệu, đặt filter/sort khi người dùng thao tác.
 */
 export default function DashboardPage() {
   const { setCategory, totalAmount } = useexpenses()

  /**
   * Gửi filter lên context và tải lại dữ liệu.
   */
   const handleFilter = (f) => {
     setCategory(f.category || '')
   }

  /**
   * Gửi sortBy lên context và tải lại dữ liệu.
   */
  const handleSort = () => {}

   return (
     <>
       <NavigationHeader />
       <Container>
         <Row className="g-3 mb-3">
           <Col md={4}>
             <Card className="shadow-sm">
               <Card.Body>
                 <Card.Title>Total of Expenses</Card.Title>
                 <div className="fs-4 fw-bold">
                   {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}
                 </div>
               </Card.Body>
             </Card>
           </Col>
           <Col md={8}>
             <Card className="shadow-sm">
               <Card.Body>
                 <Card.Title>Filter</Card.Title>
                 <FilterBar onFilter={handleFilter} onSort={handleSort} />
               </Card.Body>
             </Card>
           </Col>
         </Row>
         <ExpenseTable />
         <div className="text-center text-muted mt-4 mb-2">© 2025 PersonalBudget Demo</div>
       </Container>
     </>
   )
}
