import requests
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .utils import get_processed_items_information, get_processed_item_information


@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_items_information(request):
    items_information_json = get_items_information_from_endpoint(request)

    items_response = get_processed_items_information(items_information_json)

    items_response["author"] = {
        "name": request.user.name,
        "lastname": request.user.lastname,
    }

    return Response(items_response)


def get_items_information_from_endpoint(request):
    api_url = "https://api.mercadolibre.com/sites/MLA/search?q={}".format(request.GET.get('q', None))
    response = requests.get(api_url, verify=True)

    return response.json()


@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_item_information(request, item_id):
    item_response_json, description_response_json = get_item_information_from_endpoint(request, item_id)
    item_response = get_processed_item_information(item_response_json, description_response_json)

    item_response["author"] = {
        "name": request.user.name,
        "lastname": request.user.lastname,
    }

    return Response(item_response)


def get_item_information_from_endpoint(item_id):
    item_api_url = "https://api.mercadolibre.com/items/{}".format(item_id)
    description_api_url = "https://api.mercadolibre.com/items/{}/description".format(item_id)
    item_response = requests.get(item_api_url, verify=True)
    description_response = requests.get(description_api_url, verify=True)

    return item_response.json(), description_response.json()
