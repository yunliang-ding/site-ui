import React, { useState, useEffect, useRef } from 'react'
import { Icon, Pagination, Checkbox } from '../../index'
export default ({
  columns,
  dataSource,
  rowKey,
  style,
  pagination,
  bordered,
  checkable,
  onCheck,
  loading
}) => {
  const [_columns, setcolumns] = useState(Array.isArray(columns) ? [...columns] : [])
  const [_dataSource, setdataSource] = useState(Array.isArray(dataSource) ? [...dataSource] : [])
  const [checkedkeys, setcheckedkeys] = useState([]) // 内置选择器
  const [_pagination, setpagination] = useState({ // 内置分页器
    current: 1,
    pageSize: 10,
    total: _dataSource.length
  })
  /**自分页处理逻辑 */
  const __dataSource = pagination === false ? _dataSource : _dataSource.slice(_pagination.pageSize * (_pagination.current - 1), _pagination.pageSize * _pagination.current)
  /**全选当前数据 */
  const checkedAll = (checked) => {
    let checkedkeys = []
    if (checked) {
      __dataSource.forEach(item => {
        checkedkeys.push(item[rowKey || 'key'])
      })
    }
    setcheckedkeys(checkedkeys)
    typeof onCheck === 'function' && onCheck(checkedkeys)
  }
  const isCheckedAll = () => { // 判断是否已经全选
    let check = checkedkeys.length > 0 && __dataSource.every(item => {
      return checkedkeys.some(key => key === item[rowKey || 'key'])
    })
    return check
  }
  /**
   * useRef 调整Dom
   */
  const tableHeaderRef = useRef()
  const tableBodyRef = useRef()
  const tableFooterRef = useRef()
  useEffect(()=>{
    tableHeaderRef.current.style.width = tableBodyRef.current.getBoundingClientRect().width + 'px'
    tableFooterRef.current && (tableFooterRef.current.style.width = tableBodyRef.current.getBoundingClientRect().width + 'px')
    console.log(tableHeaderRef.current.style.width)
  })
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
  useEffect(() => {
    if (checkable) {
      let column = {
        title: <Checkbox
          checked={isCheckedAll()}
          onChange={
            (e) => {
              checkedAll(e.target.checked)
            }
          }
        />,
        width: 40,
        dataIndex: 'sui-checked-930226',
        render: (e, record) => {
          return <Checkbox
            checked={checkedkeys.includes(record[rowKey || 'key'])}
            onChange={
              () => {
                let index = checkedkeys.indexOf(record[rowKey || 'key'])
                if (index > -1) {
                  checkedkeys.splice(index, 1)
                } else {
                  checkedkeys.push(record[rowKey || 'key'])
                }
                setcheckedkeys([...checkedkeys])
                typeof onCheck === 'function' && onCheck(checkedkeys)
              }
            }
          />
        }
      }
      if (_columns[0] && _columns[0].dataIndex !== 'sui-checked-930226') { // 没有添加1项
        _columns.unshift(column)
      } else {
        _columns[0] = column
      }
      console.log('_cocheckablelumns', checkable)
      setcolumns([..._columns])
    }
  }, [checkable, checkedkeys])
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
      <div className='sui-table-header' ref={tableHeaderRef}>
        <div className='sui-table'>
          <div className='sui-table-tr'>
            {
              _columns.map(column => {
                let minWidth = column.width || (100 / _columns.length + '%')
                let columnClassName = ['sui-table-td']
                if (column.sort) {
                  columnClassName.push('sui-table-td-sort')
                }
                if (bordered) {
                  columnClassName.push('sui-table-td-grid')
                }
                return (
                  <div className={columnClassName.join(' ')} key={column.dataIndex} style={{ minWidth, width: minWidth}}>
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
      <div className='sui-table-body' ref={tableBodyRef} style={{
        height: pagination === false ? 'calc(100% - 45px)' : 'calc(100% - 90px)'
      }}>
        <div className='sui-table'>
          {
            __dataSource.map((data, index) => {
              return <div key={data[rowKey]} className='sui-table-tr'>
                {
                  _columns.map(column => {
                    let minWidth = column.width || (100 / _columns.length + '%')
                    let label = column.render ? column.render(data[column.dataIndex], data, index) : data[column.dataIndex]
                    let columnClassName = ['sui-table-td']
                    if (column.ellipsis) {
                      columnClassName.push('sui-table-td-ellipsis')
                    }
                    if (bordered) {
                      columnClassName.push('sui-table-td-grid')
                    }
                    return <div title={typeof label !== 'object' && label} key={column.dataIndex} className={columnClassName.join(' ')} style={{ minWidth, width: minWidth }}>{label}</div>
                  })
                }
              </div>
            })
          }
        </div>
      </div>
      {
        typeof pagination === 'object' ? <div className='sui-table-footer' ref={tableFooterRef}>
          <Pagination {...pagination} />
        </div> : pagination !== false && <div className='sui-table-footer' ref={tableFooterRef}>
          <Pagination
            {..._pagination}
            onChange={e => {
              _pagination.current = e
              setpagination({..._pagination})
            }}
          />
        </div>
      }
    </div>
  </>
}