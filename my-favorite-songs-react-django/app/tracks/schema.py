import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from django.db.models import Q

from .models import Track, Like
from users.schema import UserType


class TrackType(DjangoObjectType):
    class Meta:
        model = Track


class LikeType(DjangoObjectType):
    class Meta:
        model = Like


class Query(graphene.ObjectType):
    tracks = graphene.List(TrackType, search=graphene.String())
    likes = graphene.List(LikeType)

    def resolve_tracks(self, info, search=None):
        if search:
            filter = (
                Q(title__icontains=search) |
                Q(description__icontains=search) |
                Q(posted_by__username__icontains=search)
            )
            return Track.objects.filter(filter)
        return Track.objects.all()

    def resolve_likes(self, info):
        return Like.objects.all()


class CreateTrack(graphene.Mutation):
    track = graphene.Field(TrackType)

    class Arguments:
        title = graphene.String()
        description = graphene.String()
        url = graphene.String()

    def mutate(self, info, **kwargs):
        user = info.context.user

        if user.is_anonymous:
            raise GraphQLError('Log in to add a track')

        track = Track(title=kwargs.get('title'),
                      description=kwargs.get('description'), url=kwargs.get('url'), posted_by=user)
        # persits to db
        track.save()
        return CreateTrack(track=track)


class UpdateTrack(graphene.Mutation):
    track = graphene.Field(TrackType)

    class Arguments:
        track_id = graphene.Int(required=True)
        title = graphene.String()
        description = graphene.String()
        url = graphene.String()

    def mutate(self, info, **kwargs):
        user = info.context.user
        track = Track.objects.get(id=kwargs.get('track_id'))

        if user.is_anonymous:
            raise GraphQLError('Log in to update a track')
        if track.posted_by != user:
            raise GraphQLError(
                'Your are trying to update someone else\'s track')

        track.title = kwargs.get('title')
        track.description = kwargs.get('description')
        track.url = kwargs.get('url')

        track.save()
        return UpdateTrack(track=track)


class DeleteTrack(graphene.Mutation):
    # return only the id not the whole track
    track_id = graphene.Int()

    class Arguments:
        track_id = graphene.Int(required=True)

    def mutate(self, info, track_id):
        user = info.context.user
        track = Track.objects.get(id=track_id)

        if user.is_anonymous:
            raise GraphQLError('Log in to delete a track')
        if track.posted_by != user:
            raise GraphQLError('Your are not permitted to delete this track!')

        track.delete()

        return DeleteTrack(track_id=track_id)


class CreateLike(graphene.Mutation):
    user = graphene.Field(UserType)
    track = graphene.Field(TrackType)

    class Arguments:
        track_id = graphene.Int(required=True)

    def mutate(self, info, track_id):
        user = info.context.user
        track = Track.objects.get(id=track_id)

        if user.is_anonymous:
            raise GraphQLError('Log in to like the track')

        if not track:
            raise GraphQLError('Could not find track with this id')

        Like.objects.create(user=user, track=track)

        return CreateLike(user=user, track=track)


class Mutation(graphene.ObjectType):
    create_track = CreateTrack.Field()
    update_track = UpdateTrack.Field()
    delete_track = DeleteTrack.Field()
    create_like = CreateLike.Field()
