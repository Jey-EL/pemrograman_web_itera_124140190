from pyramid.view import view_config
from pyramid.httpexceptions import (
    HTTPBadRequest,
    HTTPNotFound,
)
from sqlalchemy.exc import IntegrityError
from ..models import Matakuliah


def _validate_positive_int(value, field_name):
    """Memastikan nilai bertipe integer dan bernilai lebih dari 0."""
    if isinstance(value, bool) or not isinstance(value, int):
        try:
            if isinstance(value, bool) or isinstance(value, float):
                raise ValueError
            value = int(value)
        except (ValueError, TypeError):
            return None, f'Field {field_name} harus berupa bilangan bulat (integer)!'
    if value <= 0:
        return None, f'Field {field_name} harus lebih besar dari 0!'
    return value, None


# 1. READ ALL: Menampilkan daftar seluruh mata kuliah
@view_config(route_name='matakuliah_list', renderer='json')
def matakuliah_list(request):
    """View untuk mengambil semua data mata kuliah."""
    dbsession = request.dbsession
    matakuliahs = dbsession.query(Matakuliah).order_by(Matakuliah.id.asc()).all()
    return {'matakuliahs': [mk.to_dict() for mk in matakuliahs]}


# 2. READ ONE: Menampilkan detail satu mata kuliah berdasarkan ID
@view_config(route_name='matakuliah_detail', renderer='json')
def matakuliah_detail(request):
    """View untuk melihat detail satu mata kuliah berdasarkan ID di URL."""
    dbsession = request.dbsession
    try:
        mk_id = int(request.matchdict['id'])
    except ValueError:
        return HTTPBadRequest(json_body={'error': 'ID mata kuliah harus berupa angka'})

    matakuliah = dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    if matakuliah is None:
        return HTTPNotFound(
            json_body={'error': f'Matakuliah dengan ID {mk_id} tidak ditemukan'}
        )

    return {'matakuliah': matakuliah.to_dict()}


# 3. CREATE: Menambahkan data mata kuliah baru
@view_config(route_name='matakuliah_add', request_method='POST', renderer='json')
def matakuliah_add(request):
    """View untuk menambahkan mata kuliah baru dari payload JSON."""
    try:
        json_data = request.json_body
    except Exception:
        return HTTPBadRequest(json_body={'error': 'Body request harus berupa JSON valid!'})

    # Validasi field wajib (gunakan pengecekan None agar angka 0 tetap terdeteksi dan divalidasi > 0)
    required_fields = ['kode_mk', 'nama_mk', 'sks', 'semester']
    for field in required_fields:
        if field not in json_data or json_data[field] is None or str(json_data[field]).strip() == '':
            return HTTPBadRequest(json_body={'error': f'Field {field} wajib diisi!'})

    sks, err_sks = _validate_positive_int(json_data['sks'], 'sks')
    if err_sks:
        return HTTPBadRequest(json_body={'error': err_sks})

    semester, err_sem = _validate_positive_int(json_data['semester'], 'semester')
    if err_sem:
        return HTTPBadRequest(json_body={'error': err_sem})

    dbsession = request.dbsession
    matakuliah = Matakuliah(
        kode_mk=str(json_data['kode_mk']).strip(),
        nama_mk=str(json_data['nama_mk']).strip(),
        sks=sks,
        semester=semester,
    )

    try:
        dbsession.add(matakuliah)
        dbsession.flush()
    except IntegrityError:
        dbsession.rollback()
        return HTTPBadRequest(
            json_body={'error': f"Kode mata kuliah '{matakuliah.kode_mk}' sudah terdaftar!"}
        )

    return {'success': True, 'matakuliah': matakuliah.to_dict()}


# 4. UPDATE: Memperbarui data mata kuliah yang sudah ada
@view_config(route_name='matakuliah_update', request_method='PUT', renderer='json')
def matakuliah_update(request):
    """View untuk memperbarui data mata kuliah berdasarkan ID."""
    dbsession = request.dbsession
    try:
        mk_id = int(request.matchdict['id'])
    except ValueError:
        return HTTPBadRequest(json_body={'error': 'ID mata kuliah harus berupa angka'})

    matakuliah = dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    if matakuliah is None:
        return HTTPNotFound(
            json_body={'error': f'Matakuliah dengan ID {mk_id} tidak ditemukan'}
        )

    try:
        json_data = request.json_body
    except Exception:
        return HTTPBadRequest(json_body={'error': 'Body request harus berupa JSON valid!'})

    if 'kode_mk' in json_data:
        if not json_data['kode_mk'] or str(json_data['kode_mk']).strip() == '':
            return HTTPBadRequest(json_body={'error': 'Field kode_mk tidak boleh kosong!'})
        matakuliah.kode_mk = str(json_data['kode_mk']).strip()

    if 'nama_mk' in json_data:
        if not json_data['nama_mk'] or str(json_data['nama_mk']).strip() == '':
            return HTTPBadRequest(json_body={'error': 'Field nama_mk tidak boleh kosong!'})
        matakuliah.nama_mk = str(json_data['nama_mk']).strip()

    if 'sks' in json_data:
        sks, err_sks = _validate_positive_int(json_data['sks'], 'sks')
        if err_sks:
            return HTTPBadRequest(json_body={'error': err_sks})
        matakuliah.sks = sks

    if 'semester' in json_data:
        semester, err_sem = _validate_positive_int(json_data['semester'], 'semester')
        if err_sem:
            return HTTPBadRequest(json_body={'error': err_sem})
        matakuliah.semester = semester

    try:
        dbsession.flush()
    except IntegrityError:
        dbsession.rollback()
        return HTTPBadRequest(
            json_body={'error': f"Kode mata kuliah '{matakuliah.kode_mk}' sudah digunakan!"}
        )

    return {'success': True, 'matakuliah': matakuliah.to_dict()}


# 5. DELETE: Menghapus data mata kuliah
@view_config(route_name='matakuliah_delete', request_method='DELETE', renderer='json')
def matakuliah_delete(request):
    """View untuk menghapus mata kuliah berdasarkan ID."""
    dbsession = request.dbsession
    try:
        mk_id = int(request.matchdict['id'])
    except ValueError:
        return HTTPBadRequest(json_body={'error': 'ID mata kuliah harus berupa angka'})

    matakuliah = dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    if matakuliah is None:
        return HTTPNotFound(
            json_body={'error': f'Matakuliah dengan ID {mk_id} tidak ditemukan'}
        )

    dbsession.delete(matakuliah)
    return {
        'success': True,
        'message': f'Matakuliah dengan ID {mk_id} berhasil dihapus',
    }
