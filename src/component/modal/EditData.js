import React, { useState, useEffect, useContext } from 'react'
import { Modal, Button } from 'react-bootstrap'
import Select from 'react-select'
import { Context } from '../../config/context'

export const EditData = ({ show, handleClose, data, index }) => {
  const [harga, setharga] = useState()
  const [area, setarea] = useState([])
  const [dataarea, setdataarea] = useState()
  const [datakota, setdatakota] = useState()
  const [datasize, setdatasize] = useState()
  const [size, setsize] = useState([])
  const { dispatch } = useContext(Context)

  useEffect(() => {
    setdataarea({ value: data.area_provinsi, label: data.area_provinsi })
    setdatakota({ value: data.area_kota, label: data.area_kota })
    setdatasize({ value: data.size, label: data.size })
    setharga(data.price)
  }, [data.timestamp])



  const getdataArea = async () => {
    await fetch(
      `https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/option_area`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
      .then(response => response.json())
      .then(res => {
        setarea(res)

        // console.log(res)
      })
  }
  const getdataSize = async () => {
    await fetch(
      `https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/option_size`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
      .then(response => response.json())
      .then(res => {
        setsize(res)

        // console.log(res)
      })
  }

  useEffect(() => {
    getdataArea()
    getdataSize()
  }, [])


  let optionsArea

  optionsArea = area.map((item) => (
    {
      value: `${item.province}`, label: `${item.province}`
    }
  ))

  const optionsKota = area.map((item) => (
    {
      value: `${item.city}`, label: `${item.city}`
    }
  ))
  const optionsSize = size.map((item) => (
    {
      value: `${item.size}`, label: `${item.size}`
    }
  ))

  const handleChangeArea = selectedoptions => {
    setdataarea(selectedoptions)
  }
  const handleChangeKota = selectedoptions => {
    setdatakota(selectedoptions)
  }
  const handleChangeSize = selectedoptions => {
    setdatasize(selectedoptions)
  }
  console.log(data)
  const btnEdit = () => {

    let data2 = data

    if (data !== -1) {
      data2 = ({
        area_kota: datakota.value,
        area_provinsi: dataarea.value,
        size: datasize.value,
        harga: harga
      })
    }

    dispatch({
      type: 'PROPS',
      props: data2
    })

  }





  return (
    <Modal show={show} onHide={handleClose}>

      <Modal.Body>
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12">
              Provinsi
            </div>
            <div className="col-md-12 col-sm-12">
              <Select
                value={dataarea}
                onChange={handleChangeArea}
                options={optionsArea}
                placeholder="Search Area"

              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-sm-12">
              Kota
            </div>
            <div className="col-md-12 col-sm-12">
              <Select
                value={datakota}
                onChange={handleChangeKota}
                options={optionsKota}
                placeholder="Search Kota"

              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-sm-12">
              Size
            </div>
            <div className="col-md-12 col-sm-12">
              <Select
                value={datasize}
                onChange={handleChangeSize}
                options={optionsSize}
                placeholder="Search Size"

              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-sm-12">
              Price
            </div>
            <div className="col-md-12 col-sm-12">
              <input type="text" placeholder="Harga" className="form-control"
                value={harga} onChange={(e) => setharga(e.target.value.replace(/[^0-9]+/g, ''))}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => { btnEdit(); handleClose() }}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}