import { Card, Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../..';
import { useEffect, useState } from 'react';
import { asyncFetchPlanningData } from '../../../stores/planning.store';

export function PlanningPlotCard() {
  const { planning } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<any>();
  const [selectedPlanning,setSelectedPlanning]: any = useState({})
  // const [data, setData] = useState(initialData);

  useEffect(() => {
    dispatch(asyncFetchPlanningData())
    setSelectedPlanning(planning?.plannings[0])
  }, [])

  return (
    <div>
      <Card className="second-col-card">
        <Card.Body>
          <Card.Title className="second-col-text">Histórico</Card.Title>
          <Card.Text>
            <Dropdown>
              <Dropdown.Toggle
                className="second-col-dropdown"
                variant="success"
                id="dropdown-basic"
              >
                {selectedPlanning?.name}
              </Dropdown.Toggle>

              <Dropdown.Menu>
              {planning?.plannings?.map((plannings: any, index) => {
                    return (
                      <Dropdown.Item
                        key={index}
                        onClick={() => setSelectedPlanning(plannings)}
                      >
                        {plannings.name}
                      </Dropdown.Item>
                    )
                  })}
              </Dropdown.Menu>
            </Dropdown>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="card-footer">
          <div className="frist-box">
            <span>Custos diretos</span>
          </div>
          <div className="second-box">
            <span>Custos indiretos</span>
          </div>
        </Card.Footer>
      </Card>
    </div>
  )
}
