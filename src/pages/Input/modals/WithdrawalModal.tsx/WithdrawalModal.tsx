import { useEffect, useRef, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../..'
import { Invoice } from '../../../../models/Invoice'
import { UserProduct } from '../../../../models/UserProduct'
import {
  asyncAddUserProductToStorage,
  asyncWithdrawUserProductToStorage,
  setUserProduct,
} from '../../../../stores/input.store'
import { NewProduct } from '../components/NewProduct'
import { WithdrawalProduct } from '../components/WithdrawalProduct'
import { Dialog } from 'primereact/dialog'
import { Toast } from 'primereact/toast'
import * as Yup from 'yup'
import { Formik, useFormik, Form } from 'formik'
import { classNames } from 'primereact/utils'

const emptyProductList: UserProduct[] = []
export function WithdrawalModal({
  show,
  handleClose,
}: {
  show: boolean
  handleClose: any
}) {
  const { input } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<any>()
  const [selectedInvoice, setSelectedInvoice] = useState(new Invoice())
  const [products, setProducts] = useState(emptyProductList)
  const [inputAddLineValidation, setInputAddLineValidation] = useState<any[]>([
    false,
  ])
  const [inputAddLineCompsValidation, setInputAddLineCompsValidation] =
    useState<any[]>([false])
  const [isRegisterClicked, setIsRegisterClicked] = useState(false)
  const toast = useRef<Toast>(null)
  const [withdrawalProductValidation, setWithdrawalProductValidation] =
    useState<any[]>([false])

  const onUpdateItem = (product: UserProduct, index: number) => {
    console.log('batendo aqui', product)
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


  const register = () => {
        dispatch(asyncWithdrawUserProductToStorage(products, selectedInvoice?.id!))
  }

  useEffect(() => {
    if(input.userProduct == true) {
      handleClose()
      dispatch(setUserProduct(false))
    }
  }, [input])


  useEffect(() => {
    if (isRegisterClicked) {
      formik.handleSubmit()
    }
  }, [isRegisterClicked])

  const onSubmit = (values: any, { setSubmitting }: any) => {
    const falseValidationsInput = inputAddLineValidation.filter(
      (validation: { response: boolean }) => validation.response === false,
    )
    const falseValidationWithdrawalProduct = withdrawalProductValidation.filter(
      (validation: { response: boolean }) => validation.response === false,
    )
    const falseValidationOfinputAddLineCompsValidation =
      inputAddLineCompsValidation.filter(
        (validation: { response: boolean }) => validation.response === false,
      )
      register()

    if (
      falseValidationsInput.length === 0 &&
      falseValidationOfinputAddLineCompsValidation.length === 0
    ) {
      setTimeout(() => {
        setSubmitting(false)
      }, 400)
    } else if (falseValidationWithdrawalProduct.length === 0) {
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
      headerStyle={{ backgroundColor: '#7C5529', color: '#FFF' }}
      contentStyle={{ backgroundColor: '#7C5529' }}
      header="Retirada de estoque"
      visible={show}
      style={{ width: '50vw' }}
      onHide={() => handleClose()}
    >
      <Toast ref={toast} />
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        {products.map((p, index) => {
          return (
            <WithdrawalProduct
              index={index}
              onHandleRemove={onRemoveItem}
              onHandleUpdate={onUpdateItem}
              isRegisterClicked={isRegisterClicked}
              inputAddLineCompsValidation={inputAddLineCompsValidation}
              setInputAddLineCompsValidation={setInputAddLineCompsValidation}
              inputAddLineValidation={inputAddLineValidation}
              setInputAddLineValidation={setInputAddLineCompsValidation}
            ></WithdrawalProduct>
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
            onClick={() => setProducts([...products, new UserProduct()])}
          >
            Adicionar Linha
          </Button>
          <Button
            variant="success"
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
      </form>
    </Dialog>
  )
  // return <Modal backdrop = {'static'} show={show} onHide={handleClose} size={'xl'}>
  //     <Modal.Header closeButton style={{ backgroundColor: "#7C5529", border: 'none' }}>
  //         <Modal.Title> <span style={{ color: '#fff' }}>Retirada de estoque</span></Modal.Title>
  //     </Modal.Header>
  //     <Modal.Body style={{ backgroundColor: "#7C5529" }}>
  //         {products.map((p, index) => {
  //             return <WithdrawalProduct index={index} onHandleRemove={onRemoveItem} onHandleUpdate={onUpdateItem}></WithdrawalProduct>
  //         })}
  //         <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '2%' }}>
  //             <Button variant="primary" onClick={() => setProducts([...products, new UserProduct()])}>Adicionar Linha</Button>
  //             <Button variant="success" onClick={() => register()}>Registrar</Button>
  //         </div>
  //     </Modal.Body>
  // </Modal >
}
