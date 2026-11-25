def includeme(config):
    """Mendaftarkan seluruh rute routing aplikasi ke konfigurasi Pyramid"""
    config.add_static_view('static', 'static', cache_max_age=3600)

    # Route default web home
    config.add_route('home', '/')

    # RESTful API Mahasiswa Routes
    config.add_route('mahasiswa_list', '/api/mahasiswa', request_method='GET')
    config.add_route('mahasiswa_detail', '/api/mahasiswa/{id}', request_method='GET')
    config.add_route('mahasiswa_add', '/api/mahasiswa', request_method='POST')
    config.add_route('mahasiswa_update', '/api/mahasiswa/{id}', request_method='PUT')
    config.add_route('mahasiswa_delete', '/api/mahasiswa/{id}', request_method='DELETE')
