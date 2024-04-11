import 'react-datepicker/dist/react-datepicker.css'
import { Modal } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import pt from 'date-fns/locale/pt-BR'
import { useDispatch, useSelector } from 'react-redux'
import { Part } from '../../../../models/Part'
import { asyncOutputParts, setShowDialog } from '../../../../stores/maintenance.store'
import { NewOutputParts } from '../components/NewOutputParts'
import { Dialog } from 'primereact/dialog'
import {
  dialogContentSyle,
  dialogHeaderStyle,
} from '../../../../utils/modal-style.util'
import { useFormik } from 'formik'
import { RootState } from '../../../..'

let emptyDate: Date
export function OutputPartsModal({
  show,
  handleClose,
}: {
  show: boolean
  handleClose: any
}) {
  const dispatch = useDispatch<any>()
  const [products, setProducts] = useState([new Part()])
  const [inputAddLineValidation, setInputAddLineValidation] = useState<any[]>([
    false,
  ])
  const [isRegisterClicked, setIsRegisterClicked] = useState(false)
  const { maintenance } = useSelector((state: RootState) => state)

  const onUpdateItem = (product: Part, index: number) => {
    const productsArr = [...products]
    productsArr.splice(index, 1)
    productsArr.push(product)
    setProducts(productsArr)
  }

  const onRemoveItem = (index: number) => {
    const productsArr = [...products]
    productsArr.splice(index, 1)
    setProducts(productsArr)
  }

  useEffect(() => {
    if(maintenance.showDialog == true) {
      handleClose()
      dispatch(setShowDialog(false))
    }
  }, [maintenance])

  const register = () => {
    dispatch(asyncOutputParts(products))

  }

  useEffect(() => {
    if (isRegisterClicked) {
      formik.handleSubmit()
    }
  }, [isRegisterClicked])

  const onSubmit = (values: any, { setSubmitting }: any) => {
    const falseValidations = inputAddLineValidation.filter(
      (validation: { response: boolean }) => validation.response === false,
    )

    register()
    if (falseValidations.length === 0) {
      setTimeout(() => {
        setSubmitting(false)
      }, 400)
    }
  }
  
  const formik = useFormik({
    initialValues: {},
    onSubmit,
  })

  return (
    <Dialog
      header="Saída de peça"
      visible={show}
      style={{ width: '50vw' }}
      className="custom-dialog"
      onHide={handleClose}
      headerStyle={dialogHeaderStyle}
      contentStyle={dialogContentSyle}
    >
      <div>
        {products.map((p, index) => {
          return (
            <NewOutputParts
              index={index}
              key={index}
              onHandleRemove={onRemoveItem}
              onHandleUpdate={onUpdateItem}
              isRegisterClicked={isRegisterClicked}
              inputAddLineValidation={inputAddLineValidation}
              setInputAddLineValidation={setInputAddLineValidation}
            ></NewOutputParts>
          )
        })}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: '2%',
          }}
        >
          <Button
            variant="primary"
            onClick={() => setProducts([...products, new Part()])}
          >
            Adicionar Linha
          </Button>
          <Button
            style={{ backgroundColor: '#198754' }}
            type="submit"
            onClick={() => {
              setIsRegisterClicked(true)
              setTimeout(() => {
                setIsRegisterClicked(false)
              }, 1000)
            }}
          >
            Registrar
          </Button>
        </div>
      </div>
    </Dialog>
    // <Modal backdrop={'static'} show={show} onHide={handleClose} size={'xl'}>
    //   <Modal.Header
    //     closeButton
    //     style={{ backgroundColor: '#7C5529', border: 'none' }}
    //   >
    //     <Modal.Title>
    //       {' '}
    //       <span style={{ color: '#fff' }}>Saída de Peça</span>
    //     </Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body style={{ backgroundColor: '#7C5529' }}>
    //   </Modal.Body>
    // </Modal>
  )
}
