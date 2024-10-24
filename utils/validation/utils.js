const partialExcept = (schema, requiredFields) => {
  return schema.partial().merge(schema.pick(requiredFields));
};

module.exports = {
  partialExcept,
};
