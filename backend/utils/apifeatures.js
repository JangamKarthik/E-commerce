class ApiFeatures{
    constructor(query, querystr){
        this.query = query;
        this.querystr = querystr;
    }

    search(){
        const keyword = this.querystr.keyword ? {
            name:{
                $regex:this.querystr.keyword,
                $options: "i", //for case insensitive 
            },
        }
      : {};

      this.query = this.query.find({...keyword});
      return this;
    }

    filter(){
        const queryCopy = {...this.querystr}

        //removing some fileds for category
        const removeFields = ["keyword","page","limit"];
        removeFields.forEach(key=>delete queryCopy[key]);

        //Filter for Price and Rating

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key => `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage - 1)

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }

}

module.exports = ApiFeatures