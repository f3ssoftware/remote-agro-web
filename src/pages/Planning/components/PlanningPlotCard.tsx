import { Card, Dropdown, Tab, Tabs } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../..';
import { useEffect, useState } from 'react';
import { asyncFetchPlanningData, asyncFetchTotalPlanningsCosts } from '../../../stores/planning.store';

export function PlanningPlotCard() {
  const { planning } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<any>();
  const [selectedPlanning,setSelectedPlanning]: any = useState({})
  // const [data, setData] = useState(initialData);

  useEffect(() => {
    dispatch(asyncFetchPlanningData())
    dispatch(asyncFetchTotalPlanningsCosts())
    setSelectedPlanning(planning?.plannings[0])
  }, [])

  return (
    <div>
      <Card className="second-col-plot">
        <Card.Body>
          <Card.Title className="second-col-text">Histórico
          <Dropdown>
              <Dropdown.Toggle
                className="plot-dropdown"
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
          </Card.Title>
          <Card.Text>
    
          </Card.Text>
        </Card.Body>
        <Card.Footer className="card-footer">
          <div className="frist-box">
            <span>Custos diretos</span>
            <span>{}</span>
          </div>
          <div className="second-box">
            <span>Custos indiretos</span>
          </div>
        </Card.Footer>
      </Card>
    </div>
  )
}
