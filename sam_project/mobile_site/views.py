from django.shortcuts import render
from django.views import View
from django.http import HttpResponse

# Create your views here.
class mobile_site_views_index(View):
    
    template_name = 'mobile_site/index.html'

    def get(self,request):
        print("ASA",request)
        domain = (request.path_info).replace('/','')
        return render(request, self.template_name,{'domain':domain})
        #return HttpResponse("Alban bensam")

class mobile_sub_page_index(View):
    template_name = 'mobile_site/mobile.html'

    def get(self,request):
        print("ASA",request)
        domain = (request.path_info).replace('/','')
        return render(request, self.template_name,{'domain':domain})
        #return HttpResponse("Alban bensam")
