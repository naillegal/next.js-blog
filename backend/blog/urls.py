from django.urls import path
from . import views
urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('logout/', views.logout_view, name='logout'),
    path('articles/', views.ArticleListAV.as_view(), name='articles-list'),
    path('articles/<int:pk>/', views.ArticleDetailAV.as_view(), name='articles-detail'),
]
