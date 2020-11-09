from django.contrib.auth import get_user_model
import graphene
from graphene_django import DjangoObjectType


class UserType(DjangoObjectType):
    class Meta:
        # uses default user model
        model = get_user_model()
        #  restricts to return specific fields
        only_fields = ('id', 'email', 'username', 'password')


class Query(graphene.ObjectType):
    user = graphene.Field(UserType, id=graphene.Int(required=True))
    me = graphene.Field(UserType)

    def resolve_user(self, info, id):
        return get_user_model().objects.get(id=id)

    def resolve_me(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise GraphQLError('Not logged in')
        return user


class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)

    def mutate(self, info, **kwargs):

        user = get_user_model()(
            username=kwargs.get('username'),
            email=kwargs.get('email')
        )
        password = kwargs.get('password')
        user.set_password(password)
        user.save()
        return CreateUser(user=user)


class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
