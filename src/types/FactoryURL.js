export default {
  type: 'Scalar',
  name: 'FactoryURL',
  description: 'The URL scalar type represents URL addresses.',
  serialize (value) {
    return value
  },
  parseValue (value) {
    return value
  },
  parseLiteral (ast) {
    let { GraphQLError, Kind } = this.graphql

    // regex taken from https://github.com/stylesuxx/graphql-custom-types
    let rx = new RegExp('^(?:(?:https?|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))\\.?)(?::\\d{2,5})?(?:[/?#]\\S*)?$', 'i')

    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError('Query error: expected URL to be a string but got a: ' + ast.kind, [ast])
    }

    if (!ast.value.match(rx)) {
      throw new GraphQLError('Query error: invalid URL', [ast])
    }

    return ast.value
  }
}