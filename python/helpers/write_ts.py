import os
import subprocess


def write_ts(filename, contents):
    dirname = os.path.dirname(filename)
    if not os.path.exists(dirname):
        os.makedirs(dirname)
    if os.path.exists(filename):
        raise Exception('File already exists: ' + filename)
    with open(filename, 'w') as f:
        f.write(contents)
    subprocess.call(['prettier', '-w', filename])
