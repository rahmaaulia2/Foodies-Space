import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import serverApi from "../helper/serverApi"
import swal from 'sweetalert'

export default function AddFood() {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [gender, setGender] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [allCategory, setAllCategory] = useState([])
    const navigate = useNavigate()
    const [dataP, setData] = useState([])

    async function addData(e) {
        e.preventDefault()
        try {
            // console.log(name, category, description, price, stock, imgUrl);
            let { data } = await serverApi({
                url: `/register`,
                method: 'POST',
                data: {
                    fullName : fullName,
                    email : email,
                    password : password,
                    gender : gender
                }
            })
            // console.log(data);
            // setData(data)
            navigate('/')
        } catch (error) {
            swal(error.response.data.message)
            console.log(error.response);
        }
    }

    // async function getDataById(){
    //     try {
    //         let {data} = await productApi({
    //             url : `/product/${id}`,
    //             method : 'GET',
    //             headers : {
    //                 'Authorization' : `Bearer ${localStorage.getItem('token')}`
    //             }
    //         })
    //         // console.log(data.data);
    //         setData(data.data)
    //         setName(data.data.name)
    //         setCategory(data.data.categoryId)
    //         setDescription(data.data.description)
    //         setPrice(data.data.price)
    //         setStock(data.data.stock)
    //         setImgUrl(data.data.imgUrl)
    //     } catch (error) {
    //         console.log(error.response);
    //     }
    // }

    // useEffect(() => {
    //     getDataById()
    // },[])

    // console.log(dataP);
    return (
        <section
            className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
            id="new-product-section"
        >   
            
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="display-2">Update Product</h1>
            </div>
            <div className="row">
                <div className="col-12 col-md-6">
                    <form id="product-form" onSubmit={addData}>
                        <div className="mb-3">
                            <label htmlFor="product-name">
                                Full Name <span className="text-danger fw-bold">*</span>
                            </label>
                            <input
                                value={fullName}
                                onChange={(e) => { setFullName(e.target.value) }}
                                type="text"
                                className="form-control"
                                id="product-name"
                                placeholder="Enter Full Name"
                                autoComplete="off"
                                required=""
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="product-desc">
                                Email <span className="text-danger fw-bold">*</span>
                            </label>
                            <input
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                type="text"
                                className="form-control"
                                id="product-desc"
                                placeholder="Enter Email"
                                autoComplete="off"
                                required=""
                            />
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="product-stock">
                                        Password <span className="text-danger fw-bold">*</span>
                                    </label>
                                    <input
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value) }}
                                        type="password"
                                        min="{0}"
                                        className="form-control"
                                        id="product-stock"
                                        placeholder="Enter Password"
                                        autoComplete="off"
                                        required=""
                                    />
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="product-price">
                                        Gender <span className="text-danger fw-bold">*</span>
                                    </label>
                                    <input
                                        value={gender}
                                        onChange={(e) => { setGender(e.target.value) }}
                                        type="text"
                                        min="{0}"
                                        className="form-control"
                                        id="product-price"
                                        placeholder="Enter Gender"
                                        autoComplete="off"
                                        required=""
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row mt-5 mb-3">
                            <div className="col-6">
                                <Link to={'/'} className="btn btn-lg btn-light rounded-pill w-100 p-2" >
                                    Cancel
                                </Link>
                            </div>
                            <div className="col-6">
                                <button
                                    className="btn btn-lg btn-primary rounded-pill w-100 p-2"
                                    type="submit"
                                    href=""
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}