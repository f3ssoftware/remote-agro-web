import { useEffect, useState } from 'react'
import { Container, Button, Card, Row, Col, Pagination } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../..'
import logoCard from '../../../assets/images/logoCard.png'
import { Silo } from '../../../models/Silo'
import { asyncFetchSiloData } from '../../../stores/commerce.store'
import '../CommercePlot/Commerceplot.scss'
import { NewCommercePlotModal } from '../modals/NewCommercePlotModal/NewCommercePlotModal'

const initialSiloList: Silo[] = []
export function CommercePlot() {
  const [showNewCommercePlotModal, setShowNewCommercePlotModal] =
    useState(false)
  const { commerce } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<any>()
  const [silos, setSilos] = useState(initialSiloList)
  const [pageSize, setPageSize] = useState(0)
  const [totalResults, setTotalResults] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(asyncFetchSiloData())
  }, [])

  useEffect(() => {
    setSilos(commerce.silo)
  }, [commerce])

  useEffect(() => {
    paginate(page)
    setTotalResults(commerce.silo.length)
    setPageSize(5)
  }, [commerce])

  const paginate = (page: number) => {
    const pageSize = 5
    setSilos([...commerce.silo].slice((page - 1) * pageSize, page * pageSize),
    )
  }

  return (
    <Container>
      <div className="main-box">
        <Row>
          <Col md={2} className="title-box">
            <span>Silos</span>
          </Col>
          <Col md={2}>
            <Button
              variant="success"
              className="plot-btn"
              onClick={() => setShowNewCommercePlotModal(true)}
            >
              +
            </Button>{' '}
          </Col>
        </Row>
        <Row className="plot-cards">
          {silos.map((silo, index) => (
            <Col md={2} key={index} style={{marginLeft: '2.5%'}}>
              <Card className="cardBody">
                <Card.Img variant="top" src={logoCard} className="logoCard" />
                <Card.Body>
                  <Card.Title className="cardTitle">{silo.name}</Card.Title>
                  <Card.Text className="cardText">
                     {silo?.cultivations?.map(
                        (ss: any) => `${ss?.name} ${ss?.SiloCultivar?.quantity} `,
                     )}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="flex-center" style={{ marginTop: '2%' }}>
          <Pagination size="sm">
            <Pagination.Prev
              onClick={() => {
                if (page > 1) {
                  paginate(page - 1)
                  setPage(page - 1)
                }
              }}
            />
            <Pagination.Next
              onClick={() => {
                if (page < totalResults / pageSize) {
                  console.log(totalResults / pageSize)
                  paginate(page + 1)
                  setPage(page + 1)
                } else {
                  console.log('else: ', totalResults / pageSize)
                }
              }}
            />
          </Pagination>
        </div>
      </div>
      <NewCommercePlotModal
        show={showNewCommercePlotModal}
        handleClose={() => setShowNewCommercePlotModal(false)}
      ></NewCommercePlotModal>
    </Container>
  )
}
