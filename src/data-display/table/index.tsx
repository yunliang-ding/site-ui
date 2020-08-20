import React, { useState, useEffect } from 'react'
import { Icon } from '../../index'
export default ({
  columns,
  dataSource,
  rowKey,
  style,
  line,
  pagination,
  scroll,
  loading
}) => {
  const [_columns, setcolumns] = useState(Array.isArray(columns) ? columns : [])
  const [_dataSource, setdataSource] = useState(Array.isArray(dataSource) ? dataSource : [])
  /**
   * 更新数据头和数据
   */
  useEffect(() => {
    if (Array.isArray(columns)) {
      setcolumns(columns)
    }
  }, [columns])
  useEffect(() => {
    if (Array.isArray(dataSource)) {
      setdataSource(dataSource)
    }
  }, [dataSource])
  const sort = (sort, orderBy, column) => {
    if (typeof sort === 'function') {
    } else {
      _dataSource.sort((a, b) => {
        if (orderBy === 'asc') {
          return a[column] > b[column] ? 1 : -1
        } else {
          return a[column] > b[column] ? -1 : 1
        }
      })
      setdataSource([..._dataSource]) // render
    }
  }
  return <>
    <div className='sui-table-wrapper' style={style}>
      <div className='sui-table-header'>
        <div className='sui-table'>
          <div className='sui-table-tr'>
            {
              _columns.map(column => {
                let width = column.width || (100 / _columns.length + '%')
                let columnClassName = ['sui-table-td']
                if(column.sort){
                  columnClassName.push('sui-table-td-sort')
                }
                if(column.ellipsis){
                  columnClassName.push('sui-table-td-ellipsis')
                }
                return (
                  <div className={columnClassName.join(' ')} key={column.dataIndex} style={{ width }}>
                    {column.title}
                    {
                      column.sort && <>
                        <Icon type='iconxiala1' size={12} style={{ left: 4, top: -6 }} onClick={
                          () => {
                            sort(column.sort, 'asc', column.dataIndex)
                          }
                        } />
                        <Icon type='iconxialadown' size={12} style={{ top: 6, right: 8 }} onClick={
                          () => {
                            sort(column.sort, 'desc', column.dataIndex)
                          }
                        } />
                      </>
                    }
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
      <div className='sui-table-body'>
        <div className='sui-table'>
          {
            _dataSource.map((data, index) => {
              return <div key={data[rowKey]} className='sui-table-tr'>
                {
                  _columns.map(column => {
                    let width = column.width || (100 / _columns.length + '%')
                    let label = column.render ? column.render(data[column.dataIndex], data, index) : data[column.dataIndex]
                    let columnClassName = ['sui-table-td']
                    if(column.ellipsis){
                      columnClassName.push('sui-table-td-ellipsis')
                    }
                    return <div key={column.dataIndex} className={columnClassName.join(' ')} style={{ width }}>{label}</div>
                  })
                }
              </div>
            })
          }
        </div>
      </div>
    </div>
  </>
}