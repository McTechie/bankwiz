from rest_framework.response import Response
from rest_framework import status

def exception_catcher(func):
    def runner(*args):
        try:
            func(*args)
        except Exception as e:
            return Response(
                {"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    return runner
