class MyQueryHelper {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  // Method to apply search filtering based on a keyword
  search(key) {
    const keyword = this.queryStr.keyword
      ? {
        [key]: {
          $regex: this.queryStr.keyword,
          $options: 'i'
        }
      }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  // Method to apply sorting based on createdAt field
  sort() {
    const sortOrder = this.queryStr.sort === 'desc' ? -1 : 1;
    this.query = this.query.sort({ createdAt: sortOrder });
    return this;
  }

  // Method to apply pagination
  paginate() {
    const page = this.queryStr.page ? parseInt(this.queryStr.page, 10) : 1;
    const limit = this.queryStr.limit ? parseInt(this.queryStr.limit, 10) : 1000;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = MyQueryHelper;