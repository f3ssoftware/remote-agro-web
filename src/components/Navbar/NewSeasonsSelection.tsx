import { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../..'
import { selectSeason } from '../../stores/seasons.store'
import { Dropdown } from 'primereact/dropdown'

export function NewSeasonsSelection(handleClose: any) {
  const [seasonType, setSeasonType] = useState(0)
  const [agricturalYear, setAgricturalYear] = useState(0)
  const { seasons } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<any>()
  const [selectedSeason, setSelectedSeason]: any = useState({})

  return (
    <div>
      <Row style={{ marginTop: '2%' }}>
        <Col>
          <span className="p-float-label">
            <Dropdown
              value={seasonType}
              options={[
                { label: 'Safrinha/Irrigado', value: 0 },
                { label: 'Verão', value: 1 },
              ]}
              onChange={(e) => setSeasonType(e.value)}
            />
            <label htmlFor="seasonType">Tipo de temporada</label>
          </span>
          {/* <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Tipo de temporada</Form.Label>
            <Form.Select
              aria-label=""
              onChange={(e) => {
                return setSeasonType(Number(e.target.value))
              }}
            >
              <option value={0}>Safrinha/Irrigado</option>
              <option value={1}>Verão</option>
            </Form.Select>
          </Form.Group> */}
        </Col>
        <Col>
          <span className="p-float-label">
            <Dropdown
              value={agricturalYear}
              options={seasons.seasons.map((season, index) => ({
                label: season.year,
                value: season.year,
              }))}
              onChange={(e) => setAgricturalYear(e.value)}
              placeholder="Selecione"
            />
            <label htmlFor="agricturalYear">Ano agrícola</label>
          </span>
          {/* <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>Ano agrícola</Form.Label>
            <Form.Select
              aria-label=""
              onChange={(e) => {
                return setAgricturalYear(Number(e.target.value))
              }}
            >
              <option value={0}>2020/2021</option>
              <option value={1}>2021/2022</option>
            </Form.Select>
          </Form.Group> */}
        </Col>
      </Row>
      <Row style={{ marginTop: '2%' }}>
        <Col>
          <span className="p-float-label">
            <Dropdown
              value={selectedSeason}
              options={seasons.seasons.map((season) => ({
                label: `${season.type} - ${season.year}`,
                value: season,
              }))}
              onChange={(e) => {
                setSelectedSeason(e.value)
              }}
              placeholder="Copiar dados de outra temporada"
            />
            <label htmlFor="selectSeason">
              Copiar dados de outra temporada
            </label>
          </span>
          {/* <Form.Group className="mb-3" controlId="">
            <Form.Label style={{ color: '#fff' }}>
              Copiar dados de outra temporada
            </Form.Label>
            <Form.Select
              aria-label=""
              onChange={(e) => {
                dispatch(selectSeason(e.target.value))
                handleClose()
              }}
            >
              {seasons.seasons.map((season, index) => {
                return (
                  <option value={0}>{`${season.type} - ${season.year}`}</option>
                )
              })}
            </Form.Select>
          </Form.Group> */}
        </Col>
      </Row>
    </div>
  )
}
