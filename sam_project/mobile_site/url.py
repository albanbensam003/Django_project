from django.urls import path
from . import views

urlpatterns = [
    path('', views.mobile_site_views_index.as_view(), name='mobile-site-views-index'),
    path('/mobile', views.mobile_sub_page_index.as_view(), name='mobile-sub-page-index'),
]