import React, { useState, useEffect, useContext } from 'react'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'
import { AddNewData } from '../component/modal/AddNewData'
import { EditData } from '../component/modal/EditData'
import { Context } from '../config/context'
import { Search } from './Search'

export const TableData = () => {
  const [data, setData] = useState([])
  const [dataTemp, setDataTemp] = useState([])
  const [search, setSearch] = useState('')
  const [sortprice, setsortprice] = useState('asc')
  const [sortsize, setsortsize] = useState('asc')
  const [isopenadd, setisopenadd] = useState(false)
  const [isopenedit, setisopenedit] = useState(false)
  const [dataEdit, setDataEdit] = useState({})
  const [index, setindex] = useState('')
  const { props } = useContext(Context)


  const getData = async () => {


    await fetch(
      `https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/list`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
      .then(response => response.json())
      .then(res => {

        setData(res)
        // console.log(res)
        setDataTemp(res)
      })
      .catch(e => {
        console.error(e)
      })


  }


  useEffect(() => {
    getData()
  }, [])

  const session = sessionStorage.getItem('data')
  const datasession = JSON.parse(session)

  useEffect(() => {
    if (datasession !== null) {
      setData(current => [...current, datasession])
      setDataTemp(current => [...current, datasession])

    }
    sessionStorage.removeItem('data')
  }, [isopenadd])

  useEffect(() => {
    if (index !== -1) {
      if (data[index] !== undefined) {
        data[index].area_kota = props.area_kota;
        data[index].area_provinsi = props.area_provinsi;
        data[index].area_size = props.area_size;
        data[index].price = props.harga;
        dataTemp[index].area_kota = props.area_kota;
        dataTemp[index].area_provinsi = props.area_provinsi;
        dataTemp[index].area_size = props.area_size;
        dataTemp[index].price = props.harga

      }
    }
  }, [props])

  console.log(data[index])


  console.log('iini data', dataTemp)
  const onChangeValue = (e) => {
    setSearch(e.target.value)
  }

  const btnClear = () => {
    setSearch('')
    setDataTemp(data)
  }

  const btnSearch = (e) => {
    e.preventDefault()
    let data2;

    let pattern = (search.toLocaleUpperCase())
    let reg = new RegExp(pattern, "g")

    data2 = data.filter(item => item.area_kota !== null ? item.area_kota.toLowerCase().includes(`${search}`) : item.area_kota)




    setDataTemp(data2)

    console.log(data2)
  }

  const btnSortPrice = () => {

    let data2;
    let pattern = (search)
    let reg = new RegExp(pattern, "g")

    if (sortprice === 'asc') {
      setsortprice('desc')
      data2 = dataTemp.sort(function (a, b) { return a.price - b.price })
    }
    else {
      setsortprice('asc')
      data2 = dataTemp.sort(function (a, b) { return b.price - a.price })
    }
    setDataTemp(data2)
  }


  const btnSortSize = () => {
    let data2;
    let pattern = (search)
    let reg = new RegExp(pattern, "g")

    if (sortsize === 'asc') {
      setsortsize('desc')
      data2 = dataTemp.sort(function (a, b) { return a.size - b.size })
    }
    else {
      setsortsize('asc')
      data2 = dataTemp.sort(function (a, b) { return b.size - a.size })

    }
    setDataTemp(data2)
  }

  const btnEdit = (index) => {
    let data = dataTemp.filter(price => price.price !== null && price.size !== null && price.area_kota !== null && price.area_provinsi !== null)

    setDataEdit(data[index])
    setisopenedit(!isopenedit)
    setindex(index)
  }

  const btnDelete = (index) => {
    if (index > -1) {
      dataTemp.splice(index, 1)
      data.splice(index, 1)
    }

    btnSortPrice()

    alert('Data Berhasil Di Hapus')
  }


  return (
    <div id="tabledata" className="container">
      {/* {JSON.stringify(data.filter(price => price.price !== null && price.size !== null && price.area_kota !== null && price.area_provinsi !== null)[index])} */}
      <div className="row">
        <div className="col-md-3 col-sm-12">
          <Search
            search={search}
            onChangeValue={onChangeValue}
            btnClear={btnClear}
            btnSearch={btnSearch}
          />
        </div>
        <div className="col-md-9 col-sm-12">
          <span className="btn btn-primary" onClick={() => setisopenadd(!isopenadd)}>
            Add Data
          </span>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-12 col-sm-12" >
          <table className="table table-bordered">
            <thead className="header">
              <tr>
                <th>No</th>
                <th>Provinsi</th>
                <th>
                  City
                </th>
                <th
                  style={{ cursor: 'pointer', alignItems: 'center', justifyContent: 'center' }}
                  onClick={btnSortSize}>
                  Size
                  {
                    sortsize === 'asc' ? <FaCaretUp /> : <FaCaretDown />
                  }
                </th>
                <th
                  style={{ cursor: 'pointer', alignItems: 'center', justifyContent: 'center' }}
                  onClick={btnSortPrice}
                >
                  Price
                  {
                    sortprice === 'asc' ? <FaCaretUp /> : <FaCaretDown />
                  }
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="body-table">
              {
                dataTemp.filter(price => price.price !== null && price.size !== null && price.area_kota !== null && price.area_provinsi !== null).map((item, index) => (
                  <tr key={index} className={`${index % 2 ? 'ganjil' : 'genap'}`}>
                    <th> {index + 1} </th>
                    <td> {item.area_provinsi} </td>
                    <td> {item.area_kota} </td>
                    <td> {item.size} </td>
                    <td> {item.price} </td>
                    <td>
                      <span className="btn btn-primary"
                        onClick={() => btnEdit(index)}
                      >Edit</span> &nbsp;&nbsp;
                      <span className="btn btn-danger" onClick={() => btnDelete(index)}>Delete</span>
                    </td>
                  </tr>
                ))

              }
            </tbody>
          </table>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 col-sm-12">
          <AddNewData
            show={isopenadd}
            handleClose={() => setisopenadd(!isopenadd)}
          />
        </div>
        <div className="col-md-12 col-sm-12">
          <EditData
            show={isopenedit}
            handleClose={() => setisopenedit(!isopenedit)}
            data={dataEdit}
            index={index}
          />
        </div>
      </div>
    </div>
  )
}