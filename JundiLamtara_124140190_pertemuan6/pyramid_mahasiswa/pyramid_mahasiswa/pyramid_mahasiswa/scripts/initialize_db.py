import os
import sys
import datetime
import transaction

from pyramid.paster import (
    get_appsettings,
    setup_logging,
)
from pyramid.scripts.common import parse_vars

from ..models.meta import Base
from ..models import (
    get_engine,
    get_session_factory,
    get_tm_session,
    Mahasiswa,
    Matakuliah,
)


def setup_models(dbsession):
    """Menambahkan data awal (seeding) mahasiswa dan matakuliah"""
    # Seeding Mahasiswa (jika belum ada)
    if dbsession.query(Mahasiswa).count() == 0:
        mhs1 = Mahasiswa(
            nim='12345',
            nama='Budi Santoso',
            jurusan='Teknik Informatika',
            tanggal_lahir=datetime.date(2000, 5, 15),
            alamat='Jl. Merdeka No. 123, Bandung',
        )
        mhs2 = Mahasiswa(
            nim='54321',
            nama='Siti Aminah',
            jurusan='Sistem Informasi',
            tanggal_lahir=datetime.date(2001, 8, 22),
            alamat='Jl. Mawar No. 45, Jakarta',
        )
        dbsession.add_all([mhs1, mhs2])

    # Seeding Matakuliah minimal 3 data (jika belum ada)
    if dbsession.query(Matakuliah).count() == 0:
        mk1 = Matakuliah(
            kode_mk='IF2110',
            nama_mk='Pemrograman Web',
            sks=3,
            semester=5,
        )
        mk2 = Matakuliah(
            kode_mk='IF2120',
            nama_mk='Basis Data',
            sks=4,
            semester=3,
        )
        mk3 = Matakuliah(
            kode_mk='IF3140',
            nama_mk='Jaringan Komputer',
            sks=3,
            semester=5,
        )
        dbsession.add_all([mk1, mk2, mk3])


def usage(argv):
    cmd = os.path.basename(argv[0])
    print(
        f'usage: {cmd} <config_uri> [var=value]\n'
        f'(example: "{cmd} development.ini")'
    )
    sys.exit(1)


def main(argv=sys.argv):
    if len(argv) < 2:
        usage(argv)
    config_uri = argv[1]
    options = parse_vars(argv[2:])
    setup_logging(config_uri)
    settings = get_appsettings(config_uri, options=options)

    engine = get_engine(settings)
    Base.metadata.create_all(engine)

    session_factory = get_session_factory(engine)

    with transaction.manager:
        dbsession = get_tm_session(session_factory, transaction.manager)
        setup_models(dbsession)
        print('Seeding data mahasiswa dan matakuliah berhasil dijalankan!')
