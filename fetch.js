  //fetch api usinng async await
        // let getProducts=async () => {
        // let apiResponse =await fetch('https://dummyjson.com/products')
        // let finalApi = await apiResponse.json()
        // console.log(finalApi.products)
        // }
        // getProducts()

        //fetch api usong .then .catch

let categorylistelement=document.querySelector('aside ul')


        let getProducts=()=>{
           fetch('https://dummyjson.com/products')
           .then((res)=> res.json())
           .then((finalApi)=>{
            console.log(finalApi)
           }) 
        }
        getProducts()

let getcategory=()=>{
           fetch('https://dummyjson.com/products/categories')
           .then((res)=> res.json())
           .then((finalApi)=>{
            

            let catList = ''
            finalApi.forEach(element => {
                console.log(element);
                catList+= `<li>${element.name}</li>`
            })
console.log(finalApi)
            categorylistelement.innerHTML= catList
           }) 
        }
    getcategory()