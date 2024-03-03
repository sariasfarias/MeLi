import requests
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


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


def get_processed_items_information(items_information_json):
    items = {}
    items["categories"] = \
        get_categories(items_information_json["filters"][0]["values"][0]["path_from_root"]) \
        if items_information_json.get("filters", None) \
        else []
    items["items"] = get_items(items_information_json["results"])
    return items


def get_categories(path_from_root):
    path = [value["name"] for value in path_from_root]
    return path


def get_items(results):
    items = []
    for item in results:
        items.append({
            "id": item["id"],
            "title": item["title"],
            "price": get_price(item["currency_id"], item["price"]),
            "picture":item["thumbnail"],
            "condition": item["condition"],
            "free_shipping": item["shipping"]["free_shipping"],
        })
    return items


def get_price(currency, price):
    decimals = round(price - int(price), 2)*100

    return {
        "currency": currency,
        "amount": str(int(price)),
        "decimals": str(int(decimals)) if decimals else None,
    }
