import pytest
from unittest.mock import patch

from django.urls import reverse
from rest_framework.test import APIRequestFactory, APIClient

from app.views import get_items_information, get_processed_items_information, get_categories, get_items, get_price

from constants import success_response, results, path_from_root

from users.models import UserProfile

@pytest.mark.django_db
class TestViews:
    def setup(self):
        self.client = APIClient()
        self.user = UserProfile.objects.create_user(
            email='test@example.com',
            name='John',
            lastname='Doe',
            password='mypassword'
        )
        data = {"email": "test@example.com", "password": "mypassword"}
        login = self.client.post(reverse('login'), data=data, follow=True)
        self.token = login.data["access"]

    def test_get_items_with_data(self):
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

    def test_get_items_with_empty_list(self):
        items = get_items([])
        assert items == []

    def test_get_categories_with_data(self):
        categories = get_categories(path_from_root)
        assert categories == ["Celulares y Teléfonos", "Celulares y Smartphones"]

    def test_get_categories_with_empty_list(self):
        categories = get_categories([])
        assert categories == []

    def test_get_price_with_data(self):
        price = get_price('ARS', 19876.87)
        assert price == {
            "currency": "ARS",
            "amount": "19876",
            "decimals": "87",
        }

    def test_get_price_with_no_decimals(self):
        price = get_price('ARS', 19876)
        assert price == {
            "currency": "ARS",
            "amount": "19876",
            "decimals": None,
        }

    @patch('app.views.get_categories')
    @patch('app.views.get_items')
    def test_get_processed_items_information_with_data(self, mock_get_items, mock_get_categories):
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

    @patch('app.views.get_items')
    def test_get_processed_items_information_with_no_categories(self, mock_get_items):
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

    @patch('app.views.get_items_information_from_endpoint')
    @patch('app.views.get_processed_items_information')
    def test_get_items_information_from_endpoint_success_with_auth_user(
            self,
            mock_get_processed_items_information,
            mock_get_items_information_from_endpoint
    ):
        mock_get_items_information_from_endpoint.return_value = success_response
        mock_get_processed_items_information.return_value = {
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

        response = get_items_information(
            APIRequestFactory().get(reverse('items'), HTTP_AUTHORIZATION=f"Bearer {self.token}")
        )
        assert response.status_code == 200
        assert response.data['categories'] == ["Celulares y Teléfonos", "Celulares y Smartphones"]
        assert response.data['items'] == [
            {
                "id": "MLA1407313997",
                "title": "Celular Motorola Moto G6 Xt1925 32gb Negro Refabricado",
                "price": {"currency": "ARS", "amount": "169991", "decimals": "50"},
                "picture": "http://http2.mlstatic.com/D_982223-MLA74309138792_022024-O.jpg", "condition": "new",
                "free_shipping": True
            }
        ]
        assert response.data['author'] == {'lastname': 'Doe', 'name': 'John'}
