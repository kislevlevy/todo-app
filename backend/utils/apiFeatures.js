export default class ApiFeatures {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  filter() {
    const nonFilterFields = ['sort', 'page', 'limit', 'fields', 'q'];
    const { q = '', urgency } = this.req.query;

    // Make filter object for DB filtering:
    this.filterQuery = JSON.parse(
      JSON.stringify(this.req.query).replace(
        /\b(gt|gte|lt|lte|eq)\b/g,
        (match) => `$${match}`
      )
    );

    if (urgency) this.filterQuery.urgency = urgency.split(',');
    if (q) this.filterQuery.title = new RegExp(q, 'i');
    nonFilterFields.map((ele) => delete this.filterQuery[ele]);

    // Assign res
    this.res.find(this.filterQuery);
    return this;
  }

  sort() {
    const { sort = 'due' } = this.req.query;
    this.res.sort(sort.replaceAll(',', ' '));
    return this;
  }

  fields() {
    const { fields = '-__v' } = this.req.query;
    this.res.select(fields.replaceAll(',', ' '));
    return this;
  }

  pagination() {
    const { page = 1, limit } = this.req.query;
    if (!limit) return this;

    const skip = (page - 1) * limit;
    this.res.skip(skip).limit(limit);
    return this;
  }
}
