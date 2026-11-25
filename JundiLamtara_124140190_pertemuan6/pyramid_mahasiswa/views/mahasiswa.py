import datetime
from pyramid.view import view_config
from pyramid.httpexceptions import (
    HTTPFound,
    HTTPNotFound,
    HTTPBadRequest,
)
from ..models import Mahasiswa


# 1. READ ALL: Menampilkan daftar seluruh mahasiswa
@view_config(route_name='mahasiswa_list', renderer='json')
def mahasiswa_list(request):
    """View untuk mengambil semua data mahasiswa"""
    dbsession = request.dbsession
    mahasiswas = dbsession.query(Mahasiswa).order_by(Mahasiswa.id.asc()).all()
    return {'mahasiswas': [m.to_dict() for m in mahasiswas]}


# 2. READ ONE: Menampilkan detail satu mahasiswa berdasarkan ID
@view_config(route_name='mahasiswa_detail', renderer='json')
def mahasiswa_detail(request):
    """View untuk melihat detail satu mahasiswa berdasarkan ID di URL"""
    dbsession = request.dbsession
    try:
        mahasiswa_id = int(request.matchdict['id'])
    except ValueError:
        return HTTPBadRequest(json_body={'error': 'ID mahasiswa harus berupa angka'})

    mahasiswa = dbsession.query(Mahasiswa).filter_by(id=mahasiswa_id).first()

    if mahasiswa is None:
        return HTTPNotFound(json_body={'error': f'Mahasiswa dengan ID {mahasiswa_id} tidak ditemukan'})

    return {'mahasiswa': mahasiswa.to_dict()}


# 3. CREATE: Menambahkan data mahasiswa baru
@view_config(route_name='mahasiswa_add', request_method='POST', renderer='json')
def mahasiswa_add(request):
    """View untuk menambahkan mahasiswa baru dari payload JSON"""
    try:
        json_data = request.json_body

        # Validasi field wajib
        required_fields = ['nim', 'nama', 'jurusan']
        for field in required_fields:
            if field not in json_data or not json_data[field]:
                return HTTPBadRequest(json_body={'error': f'Field {field} wajib diisi!'})

        # Validasi dan konversi format tanggal ISO YYYY-MM-DD
        tanggal_lahir = None
        if 'tanggal_lahir' in json_data and json_data['tanggal_lahir']:
            try:
                tanggal_lahir = datetime.datetime.fromisoformat(json_data['tanggal_lahir']).date()
            except ValueError:
                return HTTPBadRequest(json_body={'error': 'Format tanggal lahir tidak valid. Gunakan format YYYY-MM-DD'})

        mahasiswa = Mahasiswa(
            nim=json_data['nim'],
            nama=json_data['nama'],
            jurusan=json_data['jurusan'],
            tanggal_lahir=tanggal_lahir,
            alamat=json_data.get('alamat')
        )

        dbsession = request.dbsession
        dbsession.add(mahasiswa)
        dbsession.flush()

        return {'success': True, 'mahasiswa': mahasiswa.to_dict()}

    except Exception as e:
        return HTTPBadRequest(json_body={'error': str(e)})


# 4. UPDATE: Mengubah data mahasiswa yang sudah ada
@view_config(route_name='mahasiswa_update', request_method='PUT', renderer='json')
def mahasiswa_update(request):
    """View untuk mengupdate data mahasiswa berdasarkan ID"""
    dbsession = request.dbsession
    try:
        mahasiswa_id = int(request.matchdict['id'])
    except ValueError:
        return HTTPBadRequest(json_body={'error': 'ID mahasiswa harus berupa angka'})

    mahasiswa = dbsession.query(Mahasiswa).filter_by(id=mahasiswa_id).first()
    if mahasiswa is None:
        return HTTPNotFound(json_body={'error': f'Mahasiswa dengan ID {mahasiswa_id} tidak ditemukan'})

    try:
        json_data = request.json_body

        if 'nim' in json_data:
            mahasiswa.nim = json_data['nim']
        if 'nama' in json_data:
            mahasiswa.nama = json_data['nama']
        if 'jurusan' in json_data:
            mahasiswa.jurusan = json_data['jurusan']
        if 'alamat' in json_data:
            mahasiswa.alamat = json_data['alamat']

        if 'tanggal_lahir' in json_data:
            if json_data['tanggal_lahir']:
                try:
                    mahasiswa.tanggal_lahir = datetime.datetime.fromisoformat(json_data['tanggal_lahir']).date()
                except ValueError:
                    return HTTPBadRequest(json_body={'error': 'Format tanggal lahir tidak valid. Gunakan format YYYY-MM-DD'})
            else:
                mahasiswa.tanggal_lahir = None

        return {'success': True, 'mahasiswa': mahasiswa.to_dict()}

    except Exception as e:
        return HTTPBadRequest(json_body={'error': str(e)})


# 5. DELETE: Menghapus data mahasiswa
@view_config(route_name='mahasiswa_delete', request_method='DELETE', renderer='json')
def mahasiswa_delete(request):
    """View untuk menghapus mahasiswa berdasarkan ID"""
    dbsession = request.dbsession
    try:
        mahasiswa_id = int(request.matchdict['id'])
    except ValueError:
        return HTTPBadRequest(json_body={'error': 'ID mahasiswa harus berupa angka'})

    mahasiswa = dbsession.query(Mahasiswa).filter_by(id=mahasiswa_id).first()
    if mahasiswa is None:
        return HTTPNotFound(json_body={'error': f'Mahasiswa dengan ID {mahasiswa_id} tidak ditemukan'})

    dbsession.delete(mahasiswa)

    return {'success': True, 'message': f'Mahasiswa dengan ID {mahasiswa_id} berhasil dihapus'}
