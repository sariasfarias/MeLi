import pytest
from unittest.mock import patch

from django.urls import reverse
from rest_framework.test import APIRequestFactory, APIClient

from app.views import get_item_information, get_items_information

from constants import success_response

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

    @patch('app.views.get_item_information_from_endpoint')
    @patch('app.views.get_processed_item_information')
    def test_get_item_information_from_endpoint_success_with_auth_user(
            self,
            mock_get_processed_item_information,
            mock_get_item_information_from_endpoint
    ):
        mock_get_item_information_from_endpoint.return_value = success_response, {"plain_text": "description text"}
        mock_get_processed_item_information.return_value = {
            "items": {
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

        response = get_item_information(
            APIRequestFactory().get("api/items/MLA1407313997", HTTP_AUTHORIZATION=f"Bearer {self.token}"),
            "MLA1407313997"
        )
        assert response.status_code == 200
        print( response.data['items'])
        assert response.data['items'] == {
            "id": "MLA1407313997",
            "title": "Celular Motorola Moto G6 Xt1925 32gb Negro Refabricado",
            "price": {"currency": "ARS", "amount": "169991", "decimals": "50"},
            "picture": "http://http2.mlstatic.com/D_982223-MLA74309138792_022024-O.jpg",
            "condition": "new",
            "free_shipping": True,
            "sold_quantity": 100,
            "description": "description text",
        }
        assert response.data['author'] == {'lastname': 'Doe', 'name': 'John'}
