from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .serializers import ArticleSerializer, AuthorSerializer
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import Article
from .permissions import ArticlePermission

@api_view(['POST'])
def login_view(request):
    data = request.data
    username = data.get('username')
    password = data.get('password')
    user = User.objects.filter(username=username).first()
    if user:
        if user.check_password(password):
            serializers = AuthorSerializer(instance=user)
            return Response(serializers.data, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Wrong password!'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'detail': 'User not found!'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def register_view(request):
    serializers = AuthorSerializer(data=request.data)
    if serializers.is_valid(raise_exception=True):
        serializers.save()
        return Response(serializers.data, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def logout_view(request):
    request.user.auth_token.delete()
    return Response({'detail':'Logged out succesfully!'}, status=status.HTTP_202_ACCEPTED)


class ArticleListAV(ListCreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [ArticlePermission]

    def get_serializer_context(self):
        return {'request': self.request}


class ArticleDetailAV(RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [ArticlePermission]

