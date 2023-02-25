from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from utils.general_utils import exception_catcher


def collective_operations(model, serializer):
    class ObjectListing(APIView):
        @exception_catcher
        def get(self, request):
            """
            Endpoint to get all the objects.
            Returns:
            --------
            response:
                - success: Response (Rest Framework) containing the objects
                - failure: Response (Rest Framework) containing a error message
            """

            objects = model.objects.all()
            serialized = serializer(objects, many=True)
            return Response(serialized.data, status=status.HTTP_200_OK)


        @exception_catcher
        def delete(self, request):
            """
            Endpoint to delete all the objects.
            Returns:
            --------
            response:
                - success: Response (Rest Framework) containing a success message
                - failure: Response (Rest Framework) containing a error message
            """

            model.objects.all().delete()
            return Response({"message": "All objects deleted"}, status=status.HTTP_200_OK)

    return ObjectListing


def creator(serializer):
    class CreateObject(APIView):
        @exception_catcher
        def post(self, request):
            """
            Endpoint to create a objects.
            Returns:
            --------
            response:
                - success: Response (Rest Framework) containing the object created
                - failure: Response (Rest Framework) containing an appropriate error message
            """

            print(request.data)
            serialized = serializer(data=request.data)
            if serialized.is_valid():
                print('valid')
                serialized.save()
            else:
                print('invalid')
                print(serialized.errors)
            return Response(serialized.data, status=status.HTTP_201_CREATED)

    return CreateObject


def singular_operation(model, serializer):
    class ObjectDetail(APIView):
        @exception_catcher
        def get(self, request, id):
            """
            Endpoint to get a object by id.
            Inputs:
            -------
            request:
                - id: id of the object to be fetched
            Returns:
            --------
            response:
                - success: Response (Rest Framework) containing the object
                - failure: Response (Rest Framework) containing an appropriate error message
            """

            objects = model.objects.get(pk=id)
            serialized = serializer(objects)
            return Response(serialized.data, status=status.HTTP_200_OK)

        @exception_catcher
        def put(self, request, id):
            """
            Endpoint to update a objects by id.
            Inputs:
            -------
            request:
                - data: data to update the objects with
            Returns:
            --------
            response:
                - success: Response (Rest Framework) containing the object updated
                - failure: Response (Rest Framework) containing an appropriate error message
            """

            objects = model.objects.get(pk=id)
            serialized = serializer(objects, data=request.data)
            if serialized.is_valid():
                serialized.save()
            return Response(serialized.data, status=status.HTTP_200_OK)

        @exception_catcher
        def delete(self, request, id):
            """
            Endpoint to delete a object by id.
            Inputs:
            -------
            request:
                - id: id of the object to be deleted
            Returns:
            --------
            response:
                - success: Response (Rest Framework) containing a success message
                - failure: Response (Rest Framework) containing an appropriate error message
            """

            objects = model.objects.get(pk=id)
            objects.delete()
            return Response(
                {"message": f"Object with id {id} deleted"}, status=status.HTTP_200_OK
            )

    return ObjectDetail
