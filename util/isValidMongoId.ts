const isValidMongoId = (id: string): boolean => {
  const MONGODB_ID_REGEX = /^[0-9a-fA-F]{24}$/;

  return MONGODB_ID_REGEX.test(id);
};

export default isValidMongoId;
