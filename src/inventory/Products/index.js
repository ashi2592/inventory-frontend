
import React, { useEffect, useState } from "react";
import { Button, Grid, Header, Icon, Input, Table, TableBody, TableCell, TableRow, Modal, Container, GridRow, GridColumn, Label, Divider } from "semantic-ui-react";
import TableHeader from "../../layout/TableHeader";

import PropTypes from 'prop-types';
import AddProduct from "./addProduct";
// bring connect from react-redux, it's the bridge for connecting component to redux
import { connect } from 'react-redux'
import { GET_PRODUCT_DETAILS, GET_PRODUCT_LIST } from "../../redux/actions";

import PaginationCompact from "../../layout/pagination";
import _ from "lodash";
import ProductBarcode from "./Product-barcode";
import { useHistory } from "react-router-dom";

import ProductFliterFloatedContent from "../../components/productfilter";
import TableLoaderPage from "../../components/TableLoader";
import TableNoRecordFound from "../../components/TableNoRecordFound";
import SearchAndSelectCateory from "../../components/SearchAndSelectCateory";
import SearchAndSelectBrand from "../../components/SearchAndSelectBrand";
import SearchAndSelectSize from "../../components/SearchAndSelectSize";
import SearchAndSelectProductType from "../../components/SearchAndSelectProductType";
import SearchAndSelectColor from "../../components/SearchAndSelectColor";
import { getProductName } from "../../constant/global";


const Product = ({ getProducts, getProduct, products, product, pagination, error, loading }) => {

    const history = useHistory()
   const [openBarcodeModal, setOpenBarcodeModal] = useState(false);
    // Pagination
    const [ellipsisItem, setEllipsisItem] = useState(null);
    const [activePage, SetActivePage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    // Search 
    const [searchText, setSearchText] = useState('')
    const [searchInputs, setSearchInputs] = useState({ brand: '', category: '', size: '', type: '', color: '' })
    const [searchInputsText, setsearchInputsText] = useState({})


    const handleAddProduct = function (value = true) {
        // setCreateProduct(value)
        // setAddProductButton(value)
        // setOpenAddModal(true)

        history.push(`/add-product`)
    }

    const handleViewProduct = (id) => {
        history.push(`/product/${id}`)

    }


    const handleBarcodeProduct = (id) => {
        getProduct(id)
        setOpenBarcodeModal(true)
    }

    const handlePaginationChange = (e, { activePage }) => {
        getProducts(activePage, 10, searchText)

    }

    useEffect(() => {
        // setOpenAddModal(false)
        getProducts(1, 10, searchText, searchInputs)
    }, [])

    useEffect(() => {
        // setOpenAddModal(false)
    }, [error])

    useEffect(() => {
        let ellipsis = pagination.totalPages > 10 ? undefined : null;
        // let activePage = 1
        setEllipsisItem(ellipsis)
        setTotalPages(pagination.totalPages)
        SetActivePage(pagination.currentPage)

    }, [products, pagination])

    useEffect(() => {
        getProducts(1, 10, searchText)
    }, [searchText])

    const handleSearchChange = (e, data) => {
        setSearchText(data.value)

    }


    const handleClosePopup = () => {
        getProducts(1, 10, searchText, searchInputs)
        setOpenBarcodeModal(false)
    }


    const handleSearchDropDownChanges = (name, value, text) => {
        let newsearch = { ...searchInputs, [name]: value, }
        let newsearchtext = { ...searchInputsText, [name]: text, }
        if (text === '') {
            delete newsearchtext[name]
        }
        setsearchInputsText(newsearchtext)
        setSearchInputs(newsearch)

        // console.log(text)
    }


    const handledeleteFiltericon = (name, key) => {
        let newsearch = { ...searchInputs }
        let newsearchtext = { ...searchInputsText }
        delete newsearchtext[key]
        delete newsearch[key]

        setsearchInputsText(newsearchtext)
        setSearchInputs(newsearch)
    }

    useEffect(() => {

        getProducts(1, 10, searchText, searchInputs)
    }, [searchInputs])

    return (<Container fluid>


        <Header>
            Products
        </Header>
        <Grid stackable>
            <GridRow >
                <GridColumn width={4}>

                    <Input onChange={_.debounce(handleSearchChange, 500, {
                        leading: true,
                    })} icon="search" value={searchText} placeholder={'Search Product..'}></Input>

                </GridColumn>
                <GridColumn width={12} mobile={6} textAlign={'right'}>
                    <div> {searchInputsText &&
                        (Object.keys(searchInputsText) || []).map(x => (<Label>{x.toUpperCase()} :  {searchInputsText[x]} <Icon onClick={() => handledeleteFiltericon(searchInputsText[x], x)} name={'close'}></Icon></Label>))
                    }
                    </div>
                    <Button active={true} onClick={handleAddProduct} color={'green'}><Icon name="plus"></Icon> Add product</Button>
                </GridColumn>
            </GridRow>
        </Grid>


        <Divider></Divider>
        <Table celled >
            <TableHeader Headers={['Brand', 'Category', 'Type ', 'Color', 'Size', 'Qty', 'Selling Price', , 'Action']}></TableHeader>


            <TableBody>
                <TableRow>
                    <TableCell>
                        <SearchAndSelectBrand
                            handleDropDownChanges={handleSearchDropDownChanges}
                            placeholder={'Search Brand'}
                            dropdownName={'brand'}
                            value={searchInputs.brand}
                            clearable={true}


                        ></SearchAndSelectBrand>
                    </TableCell>
                    <TableCell>
                        <SearchAndSelectCateory
                            handleDropDownChanges={handleSearchDropDownChanges}
                            placeholder={'Select Category'}
                            dropdownName={'category'}
                            value={searchInputs.category}
                            clearable={true}
                        ></SearchAndSelectCateory>
                    </TableCell>

                    <TableCell>
                        <SearchAndSelectProductType
                            handleDropDownChanges={handleSearchDropDownChanges}
                            placeholder={'Search Type'}
                            dropdownName={'type'}
                            value={searchInputs.type}
                            clearable={true}


                        ></SearchAndSelectProductType>
                    </TableCell>

                    <TableCell>
                        <SearchAndSelectColor
                            handleDropDownChanges={handleSearchDropDownChanges}
                            placeholder={'Search Color'}
                            dropdownName={'color'}
                            value={searchInputs.color}
                            clearable={true}


                        ></SearchAndSelectColor>

                    </TableCell>



                    <TableCell>
                        <SearchAndSelectSize
                            handleDropDownChanges={handleSearchDropDownChanges}
                            placeholder={'Search Size'}
                            dropdownName={'size'}
                            value={searchInputs.size}
                            clearable={true}


                        ></SearchAndSelectSize>
                    </TableCell>
                    <TableCell>

                    </TableCell>
                    <TableCell>

                    </TableCell>
                    <TableCell>

                    </TableCell>

                </TableRow>

                {loading && <TableLoaderPage colSpan={"10"}></TableLoaderPage>}
                {(loading === false && products.length === 0) && (<TableNoRecordFound></TableNoRecordFound>)}


                {loading === false && products.map(x => (<TableRow key={'product-' + x._id} error={x.productQty <= 0}>

                    {/* <TableCell>{x.productName}</TableCell> */}
                    {/* <TableCell>{x.productCode}</TableCell> */}
                    <TableCell>{x.productBrandObj ? x.productBrandObj.brandName : ''} </TableCell>

                    <TableCell>{x.productCategoryObj ? x.productCategoryObj.categoryName : ''} </TableCell>
                    <TableCell>{x.productTypeObj ? x.productTypeObj.typeName : ''} </TableCell>
                    <TableCell> {x.productColorObj ? x.productColorObj.colorName : ''}   </TableCell>
                    <TableCell> {x.productSizeObj ? x.productSizeObj.sizeName : ''}  </TableCell>
                    <TableCell>{x.barcodes ? x.barcodes.length : 0}</TableCell>
                    <TableCell>{x.productPrice}</TableCell>
                    <TableCell>
                        <Icon name="eye" onClick={() => { handleViewProduct(x._id) }}></Icon>
                        <Icon name="barcode" onClick={() => { handleBarcodeProduct(x._id) }}></Icon>

                    </TableCell></TableRow>))}
            </TableBody>
            <Table.Footer fullWidth>
                <TableRow>
                    <TableCell>

                    </TableCell>

                </TableRow>

            </Table.Footer>
        </Table>
        <PaginationCompact
            activePage={activePage}
            totalPages={totalPages}
            ellipsisItem={ellipsisItem}
            handlePaginationChange={handlePaginationChange}
        ></PaginationCompact>




        <Modal
            onClose={() => setOpenBarcodeModal(false)}
            onOpen={() => setOpenBarcodeModal(true)}
            open={openBarcodeModal}

        >
            <Modal.Header>
                {getProductName(product)}
                <Icon name="close" onClick={handleClosePopup}></Icon>
                
            </Modal.Header>
            <Modal.Content scrolling>
                <ProductBarcode isAutofocusEnable={true}></ProductBarcode>
            </Modal.Content>

        </Modal>

    </Container>

    )

}

Product.propTypes = {
    loading: PropTypes.bool,
    products: PropTypes.array,
    product: PropTypes.object,
    getProducts: PropTypes.func.isRequired,
    getProduct: PropTypes.func.isRequired
}



const mapStateToProps = (state) => ({
    products: state.products.products,
    product: state.products.product,
    pagination: state.products.pagination,
    error: state.products.error,
    loading: state.products.loading
    // state: state
})

const mapDispatchToProps = (dispatch) => ({
    getProducts: (page, count, searchText, searchInputs) => dispatch({ type: GET_PRODUCT_LIST, payload: { page, count, searchText, searchInputs } }),
    getProduct: (id) => dispatch({ type: GET_PRODUCT_DETAILS, payload: { id } }),

})

export default connect(mapStateToProps, mapDispatchToProps)(Product);