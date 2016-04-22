
import os

PROJECT_HOME = os.path.dirname(__file__)
#Config for Flask-Collect
COLLECT_STATIC_ROOT = 'static/'

#Config for Flask-Assets
ASSETS_DEBUG = False #To not compress the js and css set this to True

# Application defined config variables
COVERAGE_MAP_GEOSERVER_ENDPOINT = ''
SITES_MAP_GEOSERVER_ENDPOINT = ''
SLD_ENDPOINT = ''
CODES_ENDPOINT = ''
SEARCH_QUERY_ENDPOINT = ''
PUBLIC_SRSNAMES_ENDPOINT = ''

NLDI_COMID_ENDPOINT = 'http://ec2-54-163-241-137.compute-1.amazonaws.com/arcgis/rest/services/NHDPlus_Flattened/MapServer'
NLDI_SERVICES_ENDPOINT = ''

NWIS_SITES_OGC_ENDPOINT = 'http://cida.usgs.gov/nwc/proxygeoserver/NWC/wms'
NWIS_SITES_LAYER_NAME = 'NWC:gagesII'

GA_TRACKING_CODE = ''

#set to false in instance/config.py if you want to turn off the NLDI feature
NLDI_ENABLED = True

LESS_BIN = os.path.join(PROJECT_HOME, 'node_modules', 'less', 'bin', 'lessc')

CACHE_CONFIG = {'CACHE_TYPE': 'null'}
REDIS_CONFIG = None

#set the default cache timeout for wqp http caches
CACHE_TIMEOUT = None

#for robots.txt
ROBOTS_WELCOME = False

#for provider pages
PROVIDER_PAGES = False