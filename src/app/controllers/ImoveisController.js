
const imoveisService = require("../services/imoveis");
const axios = require("axios");

class ImovelController {

      async index(req, res) {
        // const service = imoveisService()
        console.log('Iniciando busca')
        try {
        // const {data} = await service.get()
        const url = "https://imoveis-zapimoveis.s3.sa-east-1.amazonaws.com/imoveis.json?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXNhLWVhc3QtMSJHMEUCIQCkEUqS0JP%2BQ6cAspgrnGA9Mimw4x%2BB6o4CNpqWUphLgAIgLiZlcPTfKgHgF0KGqUmnZymKEpBpYmNE5IymcrIVSEwq5AIIfBADGgw0ODc2ODQxNjA2MTgiDAg6c0EAdsG7V4ILayrBAqBQep5OMHzs6rRhpyo83KHbJhxra3Qno0v6U7SkLCbO5tnic0FHIYyLJswIAW43PTNoSAtDh6X893ZNWFR7l%2F0HuYe1aPVKE2dKXh%2BYRMs5FVdm9pHBKzDDM8n0N3YYLnZpnrWrN5laCpAW4Dofls2Ioae1prJ5H1x6Ax728rFPA37E02lfOWjk%2FkjcxkQqXoFI9nRX6LjZSukWXWkPrXjmZG8j%2BleA%2BjTSI2iDhB34KKUp6gTty%2FSnEr7vPgcm9VG67BQij%2BVdlqF4OjpyCIZVfcZVUfMjvi5wOTplDZtmKSbfUhv8p7VH3j%2Fw8OMBml4cxVnuwiM%2Bug%2FFwD5KiIklZnEj%2FEfRXllO2xBBbkwpBo%2FBJrLqaoxAeuT4mHl%2Bar9ita7JcxjVnKKDNNAVJxuARgCPSn1MKWKEYmzqNyVxpjCY9MOYBjqzAncaJE%2F5rTO4f7ey9hPTDTM%2FplOFfQQQFZrxDQeF43JO3WQzSm%2B7ReH8TbAoWE6Buk8BznoyA4%2F4tHQhO1ACxzIkhQCIlSUacmXWFr0Ru0VyKuyegKw0SP7JsVB09sb4bvOYiCpXmRxVLLX2ZRIV9X%2BcYucPhpB1CsdGknhfqk8mO45JCuIw3HIZ4kBxLQ0mgohD4UYQjEXa0ZdyzLJPNjYrGKmq0C%2BOx4A5YwbFoM418M2PSYrNmB5BXYJuJsHXpvXPUX7qBBs5Pboxp5%2F0iDqdrI3KHfBREhO8nfwdMYtLDIQQjTKAVWNYNefNcdFR01oB26reZBQpK3ddiRzTsj4Aoj7bQVYlydQ991Y9r0C78mSLtqSfToy1ESYT2zxnDrsOOEP0EhBrIdoRMuf8zfq06sc%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220901T183000Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIAXDDB5XRVHEV6YAGW%2F20220901%2Fsa-east-1%2Fs3%2Faws4_request&X-Amz-Signature=a4e078d96237dc270c3550731d913e38e26f5a1a3d6cee8941f453c446672aff"
        const { data } = await axios.get(url);

        console.log('Dados obtidos');
        // console.log(data);

        res.json(data)
      }catch(error) {
        console.log(error)
      }
       
    }

}

module.exports = new ImovelController();
