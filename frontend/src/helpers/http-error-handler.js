export default function httpErrorHandler(error, defaultMessage = null) {
  const message = defaultMessage || 'Nos deparamos com um erro inesperado. Tente novamente mais tarde.'
  if (error && error.message) {
    return error
  }
  return error && error.response && error.response.data? error.response.data: { message }
}
