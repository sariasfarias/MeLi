from unittest.mock import patch

from constants import item, results, path_from_root, success_response
from app.utils import (
    get_item,
    get_items,
    get_categories,
    get_price,
    get_processed_item_information,
    get_processed_items_information,
)


def test_get_item_with_data():
    item_result = get_item(item)
    assert item_result == {
        "id": "MLA1407313997",
        "title": "Celular Motorola Moto G6 Xt1925 32gb Negro Refabricado",
        "price": {"currency": "ARS", "amount": "169991", "decimals": "50"},
        "picture": "http://http2.mlstatic.com/D_982223-MLA74309138792_022024-O.jpg", "condition": "new",
        "condition": "new",
        "free_shipping": True,
        "sold_quantity": 100,
    }


def test_get_item_with_no_data():
    item_result = get_item(None)
    assert item_result == {}


def test_get_items_with_data():
    items = get_items(results)
    assert items == [
        {
            "id": "MLA1407313997",
            "title": "Celular Motorola Moto G6 Xt1925 32gb Negro Refabricado",
            "price": {"currency": "ARS", "amount": "169991", "decimals": "50"},
            "picture": "http://http2.mlstatic.com/D_982223-MLA74309138792_022024-O.jpg", "condition": "new",
            "free_shipping": True
        }
    ]


def test_get_items_with_empty_list():
    items = get_items([])
    assert items == []


def test_get_categories_with_data():
    categories = get_categories(path_from_root)
    assert categories == ["Celulares y Teléfonos", "Celulares y Smartphones"]


def test_get_categories_with_empty_list():
    categories = get_categories([])
    assert categories == []


def test_get_price_with_data():
    price = get_price('ARS', 19876.87)
    assert price == {
        "currency": "ARS",
        "amount": "19876",
        "decimals": "87",
    }


def test_get_price_with_no_decimals():
    price = get_price('ARS', 19876)
    assert price == {
        "currency": "ARS",
        "amount": "19876",
        "decimals": None,
    }


@patch('app.utils.get_categories')
@patch('app.utils.get_items')
def test_get_processed_items_information_with_data(mock_get_items, mock_get_categories):
    mock_get_categories.return_value = ["Celulares y Teléfonos", "Celulares y Smartphones"]
    mock_get_items.return_value = [
        {
            "id": "MLA1407313997",
            "title": "Celular Motorola Moto G6 Xt1925 32gb Negro Refabricado",
            "price": {"currency": "ARS", "amount": "169991", "decimals": "50"},
            "picture": "http://http2.mlstatic.com/D_982223-MLA74309138792_022024-O.jpg", "condition": "new",
            "free_shipping": True
        }
    ]

    items = get_processed_items_information(success_response)
    assert items == {
        "categories": ["Celulares y Teléfonos", "Celulares y Smartphones"],
        "items": [
            {
                "id": "MLA1407313997",
                "title": "Celular Motorola Moto G6 Xt1925 32gb Negro Refabricado",
                "price": {"currency": "ARS", "amount": "169991", "decimals": "50"},
                "picture": "http://http2.mlstatic.com/D_982223-MLA74309138792_022024-O.jpg", "condition": "new",
                "free_shipping": True
            }
        ]
    }


@patch('app.utils.get_items')
def test_get_processed_items_information_with_no_categories(mock_get_items):
    incomplete_response = success_response.copy()
    incomplete_response.pop("filters", None)
    mock_get_items.return_value = [
        {
            "id": "MLA1407313997",
            "title": "Celular Motorola Moto G6 Xt1925 32gb Negro Refabricado",
            "price": {"currency": "ARS", "amount": "169991", "decimals": "50"},
            "picture": "http://http2.mlstatic.com/D_982223-MLA74309138792_022024-O.jpg", "condition": "new",
            "free_shipping": True
        }
    ]

    items = get_processed_items_information(incomplete_response)
    assert items == {
        "categories": [],
        "items": [
            {
                "id": "MLA1407313997",
                "title": "Celular Motorola Moto G6 Xt1925 32gb Negro Refabricado",
                "price": {"currency": "ARS", "amount": "169991", "decimals": "50"},
                "picture": "http://http2.mlstatic.com/D_982223-MLA74309138792_022024-O.jpg", "condition": "new",
                "free_shipping": True
            }
        ]
    }


@patch('app.utils.get_item')
def test_get_processed_item_information(mock_get_item):
    mock_get_item.return_value = {
        "id": "MLA1407313997",
        "title": "Celular Motorola Moto G6 Xt1925 32gb Negro Refabricado",
        "price": {"currency": "ARS", "amount": "169991", "decimals": "50"},
        "picture": "http://http2.mlstatic.com/D_982223-MLA74309138792_022024-O.jpg", "condition": "new",
        "condition": "new",
        "free_shipping": True,
        "sold_quantity": 100,
    }
    description_json = {"plain_text": "description text"}
    item_response = get_processed_item_information(success_response, description_json)

    assert item_response == {
        "item": {
            "id": "MLA1407313997",
            "title": "Celular Motorola Moto G6 Xt1925 32gb Negro Refabricado",
            "price": {"currency": "ARS", "amount": "169991", "decimals": "50"},
            "picture": "http://http2.mlstatic.com/D_982223-MLA74309138792_022024-O.jpg",
            "condition": "new",
            "free_shipping": True,
            "sold_quantity": 100,
            "description": "description text",
        }
    }
