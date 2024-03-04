def get_processed_items_information(items_information_json):
    items = {}
    items["categories"] = \
        get_categories(items_information_json["filters"][0]["values"][0]["path_from_root"]) \
            if items_information_json.get("filters", None) \
            else []
    items["items"] = get_items(items_information_json["results"])
    return items


def get_processed_item_information(item_information_json, description_response_json):
    item = {"item": get_item(item_information_json)}
    item["item"]["description"] = description_response_json["plain_text"]
    return item


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
            "picture": item["thumbnail"],
            "condition": item["condition"],
            "free_shipping": item["shipping"]["free_shipping"],
        })
    return items


def get_price(currency, price):
    decimals = round(price - int(price), 2) * 100

    return {
        "currency": currency,
        "amount": str(int(price)),
        "decimals": str(int(decimals)) if decimals else None,
    }


def get_item(result):
    return {
        "id": result["id"],
        "title": result["title"],
        "price": get_price(result["currency_id"], result["price"]),
        "picture": result["thumbnail"],
        "condition": result["condition"],
        "free_shipping": result["shipping"]["free_shipping"],
        "sold_quantity": result["initial_quantity"],
    } if result else {}
