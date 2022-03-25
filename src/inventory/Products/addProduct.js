import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, Message, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import { ADD_PRODUCT, GET_BRAND_LIST, GET_CATEGORY_LIST, GET_COLOR_LIST, GET_SIZE_LIST, GET_SUPPLIER_LIST } from "../../redux/actions";
import DropdownSearchSelection from "../../layout/Dropdown";
import _ from "lodash";


const AddProduct = ({ addProduct, handleAddProduct, getCategories, categories, colors, getColors,
    sizes, getSizes, suppliers, getSuppliers, getBrand, brand }) => {

    const [formload, setFormLoad] = useState(false);
    const [formError, setFormError] = useState(false);
    const [inputs, setInputs] = useState({});
    const [categoriesOptions, setCategoriesOptions] = useState([])
    const [colorOptions, setcolorOptions] = useState([])
    const [sizeOptions, setsizeOption] = useState([])
    const [supplierOptions, setSupplierOptions] = useState([])
    const [brandOptions, setBrandOptions] = useState([])


    // initial apis

    useEffect(() => {
        getCategories()
        getColors()
        getSizes()
        getSuppliers()
        getBrand()
    }, [])


    // initial value set
    useEffect(() => {
        // getCategories()

        const categoryOpt = _.map(categories, (data, index) => ({ key: data.id, value: data.categoryName }))
        setCategoriesOptions(categoryOpt)

    }, [categories])

    useEffect(() => {
        const colorOpt = _.map(colors, (data, index) => ({ key: data.id, value: data.color }))
        setcolorOptions(colorOpt)

    }, [colors])


    useEffect(() => {
        const sizeOpt = _.map(sizes, (data, index) => ({ key: data.id, value: data.size }))
        setsizeOption(sizeOpt)

    }, [sizes])
    useEffect(() => {
        const sizeOpt = _.map(suppliers, (data, index) => ({ key: data.id, value: data.supplierName }))
        setSupplierOptions(sizeOpt)
    }, [suppliers])

    useEffect(() => {
        const brandOpt = _.map(brand, (data, index) => ({ key: data.id, value: data.brandName }))
        setBrandOptions(brandOpt)
    }, [brand])


    const handleChange = (event) => {
        event.preventDefault()

        let name = event.target.name;
        let value = event.target.value;
        // alert(name + '==========' + value)
        setInputs(values => { return { ...values, [name]: value } });
    }

    const handleCheckbox = (name, value) => {
        setInputs(values => { return { ...values, [name]: !value } });
    }


    const handleDropDownChanges = (name, value) => {
        // alert(JSON.stringify({name,value}))
        setInputs(values => { return { ...values, [name]: value } });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addProduct(inputs);
        handleAddProduct(false)
    }


    return (

        <Form loading={formload} error={formError} onSubmit={handleSubmit}>
            <Message
                error
                header='Action Forbidden'
                content='You can only sign up for an account once with a given e-mail address.'
            />
            <Form.Group >
                <Table>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                Product Name
                            </Table.Cell>
                            <Table.Cell>
                                <Form.Field
                                    id="form-input-control-product-name"
                                    control={Input}
                                    placeholder='Enter Product Name'
                                    onChange={handleChange}
                                    name={'productName'}
                                />
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                Product Category
                            </Table.Cell>
                            <Table.Cell>
                                <DropdownSearchSelection placeholder={'Category'} ArrayofObj={categoriesOptions} handleDropDownChanges={handleDropDownChanges} dropdownName={'productCategory'}></DropdownSearchSelection>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                Product Colors
                            </Table.Cell>
                            <Table.Cell>
                                <DropdownSearchSelection placeholder={'Colors'} ArrayofObj={colorOptions} handleDropDownChanges={handleDropDownChanges} dropdownName={'productColor'}></DropdownSearchSelection>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                Product Size
                            </Table.Cell>
                            <Table.Cell>
                                <DropdownSearchSelection placeholder={'Size'} ArrayofObj={sizeOptions} handleDropDownChanges={handleDropDownChanges} dropdownName={'productSize'}></DropdownSearchSelection>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                Product Qty
                            </Table.Cell>
                            <Table.Cell>

                                <Input
                                    label={{ basic: true, content: 'Pc' }}
                                    labelPosition='right'
                                    placeholder='Enter Product qty...'
                                    name={'productQty'}
                                    onChange={handleChange}
                                    required
                                />
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                Product MRP
                            </Table.Cell>
                            <Table.Cell>

                                <Input
                                    label={{ basic: true, content: 'RS' }}
                                    labelPosition='right'
                                    placeholder='Enter Product MRP...'
                                    name={'productMRP'}
                                    onChange={handleChange}
                                    required
                                />
                            </Table.Cell>
                        </Table.Row>


                        <Table.Row>
                            <Table.Cell>
                                Product Sell Price
                            </Table.Cell>
                            <Table.Cell>

                                <Input
                                    label={{ basic: true, content: 'RS' }}
                                    labelPosition='right'
                                    placeholder='Enter Product Selling Priice...'
                                    name={'productSellPrice'}
                                    onChange={handleChange}
                                    required
                                />
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell>
                                Product Supplier
                            </Table.Cell>
                            <Table.Cell>
                                <DropdownSearchSelection placeholder={'Supplier'} ArrayofObj={supplierOptions} handleDropDownChanges={handleDropDownChanges} dropdownName={'productSupplier'}></DropdownSearchSelection>

                            </Table.Cell>
                        </Table.Row>


                        <Table.Row>
                            <Table.Cell>
                                Product Brand
                            </Table.Cell>
                            <Table.Cell>
                                <DropdownSearchSelection placeholder={'brand'} ArrayofObj={brandOptions} handleDropDownChanges={handleDropDownChanges} dropdownName={'productBrand'}></DropdownSearchSelection>

                            </Table.Cell>
                        </Table.Row>



                        <Table.Row>
                            <Table.Cell>
                                Product Status
                            </Table.Cell>
                            <Table.Cell>
                                <Checkbox
                                    toggle
                                    checked={inputs.status}
                                    label='is Active'
                                    onChange={() => handleCheckbox('status', (inputs.status ? inputs.status : false))}
                                />
                            </Table.Cell>
                        </Table.Row>


                        <Table.Row>
                            <Table.Cell>
                                <Button type='submit'>Save</Button>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>





            </Form.Group>
        </Form>

    )
}


const mapDispatchToProps = (dispatch) => ( {


        addProduct: (data) => dispatch({ type: ADD_PRODUCT, payload: data }),
        getCategories: () => dispatch({ type: GET_CATEGORY_LIST }),
        getColors: () => dispatch({ type: GET_COLOR_LIST }),
        getSizes: () => dispatch({ type: GET_SIZE_LIST }),
        getSuppliers: () => dispatch({ type: GET_SUPPLIER_LIST }),
        getBrand: () => dispatch({ type: GET_BRAND_LIST })



    }
)


const mapStateToProps = (state) => ({
    categories: state.category.categories,
    colors: state.colors.colors,
    sizes: state.sizes.sizes,
    suppliers: state.suppliers.suppliers,
    brand: state.brand.brands
})

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);