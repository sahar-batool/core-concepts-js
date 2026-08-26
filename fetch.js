  //fetch api usinng async await
        // let getProducts=async () => {
        // let apiResponse =await fetch('https://dummyjson.com/products')
        // let finalApi = await apiResponse.json()
        // console.log(finalApi.products)
        // }
        // getProducts()

        //fetch api usong .then .catch

let categorylistelement=document.querySelector('aside ul')
let productslistelement=document.querySelector('.products')
let currentSlug;
let getProducts=( catSlug='') =>{
        let apiUrl;
        if(catSlug===''){
            apiUrl='https://dummyjson.com/products'
        }else{
            apiUrl=`https://dummyjson.com/products/category/${catSlug}`
        }

           fetch(apiUrl)
           .then((res)=> res.json())
           .then((finalApi)=>{
            let { products } = finalApi

            let prolist = ''
            products.forEach((object)=>{
                prolist += `<div class="productitems">
                <img src="${object.thumbnail}" alt"">
                <div class="priceCart">
                    <b>${object.price}</b>
                    <button>Add to cart</button>
                </div>
                <h3>${object.title}</h3>
            </div>`
        
            })

            productslistelement.innerHTML=prolist
         } ).catch((err)=>{
        console.log(err)
         })
        

        }
    
    



let getcategory=()=>{
           fetch('https://dummyjson.com/products/categories')
           .then((res)=> res.json())
           .then((finalApi)=>{
            

            let catList = ''
            finalApi.forEach(element => {
                console.log(element);
                catList+= `<li class="${element.slug==currentSlug ? 'activeCat' : ''}"
                     data-slug="${element.slug}">${element.name}</li>`
            })
            categorylistelement.innerHTML= catList
           }) 
        }
    

    categorylistelement.addEventListener("click",(e)=>{
        if(e.target.tagName=="LI"){
            currentSlug=e.target.getAttribute('data-slug')

            getProducts(currentSlug)
            getcategory()
        }
    })

    getcategory()
    getProducts()

