import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def get_items_information(request):
    items_endpoint_information = get_items_information_from_endpoint(request)
    return Response(items_endpoint_information)


def get_items_information_from_endpoint(request):
    api_url = "https://api.mercadolibre.com/sites/MLA/search?q={}".format(request.GET.get('q', None))
    response = requests.get(api_url, verify=True)

    return response.json()
