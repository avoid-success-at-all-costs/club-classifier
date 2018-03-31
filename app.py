from flask import Flask, request, render_template
import nltk
from nltk.tokenize import sent_tokenize, word_tokenize
from vocab import Vocabulary
from collections import Counter, defaultdict
import json
import numpy as np

CLUBS = json.load(open('clubs.json'))

app = Flask(__name__)

@app.route('/')
def my_form():
    return render_template('my-form.html')

@app.route('/', methods=['POST'])
def my_form_post():
    text = request.form['text']
    return str(query(text))


def tfidf(words):
    counts = Counter(words)
    result = {}
    for w in words:
        tf = counts[w]
        df = len(WORD_DOCUMENTS[w]) + 1
        N = len(DOCUMENTS)
        result[w] = tf * np.log(N/df)

    z = np.sqrt(sum(w ** 2 for k, w in result.items()))
    for k in list(result.keys()):
        result[k] = result[k] / z
    return result


def query(sentence):
    words = word_tokenize(sentence)
    words = [w.lower() for w in words if w not in STOP_LIST]
    words = [VOC.get(w) for w in words]
    words = [0 if w == -1 else w
             for w in words ]

    words = tfidf(words)

    result = []

    for i, doc in enumerate(DOCUMENT_TFIDS):
        key_set = set(doc.keys()) & set(words.keys())

        score = 0.0
        for k in key_set:
            score += words[k] * doc[k]

        result.append((CLUBS[i]['name'], score))

    result.sort(key=lambda t: -t[-1])

    return result


if __name__ == "__main__":
    VOC = Vocabulary()
    VOC.update('__OOV__')

    STOP_LIST = """
    a about above across after again against all almost alone along already also although always among an and another any anybody anyone anything anywhere are area areas around as ask asked asking asks at away b back backed backing backs be became because become becomes been before began behind being beings best better between big both but by c came can cannot case cases certain certainly clear clearly come could d did differ different differently do does done down down downed downing downs during e each early either end ended ending ends enough even evenly ever every everybody everyone everything everywhere f face faces fact facts far felt few find finds first for four from full fully further furthered furthering furthers g gave general generally get gets give given gives go going good goods got great greater greatest group grouped grouping groups h had has have having he her here herself high high high higher highest him himself his how however i if important in interest interested interesting interests into is it its itself j just k keep keeps kind knew know known knows l large largely last later latest least less let lets like likely long longer longest m made make making man many may me member members men might more most mostly mr mrs much must my myself n necessary need needed needing needs never new new newer newest next no nobody non noone not nothing now nowhere number numbers o of off often old older oldest on once one only open opened opening opens or order ordered ordering orders other others our out over p part parted parting parts per perhaps place places point pointed pointing points possible present presented presenting presents problem problems put puts q quite r rather really right right room rooms s said same saw say says second seconds see seem seemed seeming seems sees several shall she should show showed showing shows side sides since small smaller smallest so some somebody someone something somewhere state states still still such sure t take taken than that the their them then there therefore these they thing things think thinks this those though thought thoughts three through thus to today together too took toward turn turned turning turns two u under until up upon us use used uses v very w want wanted wanting wants was way ways we well wells went were what when where whether which while who whole whose why will with within without work worked working works would x y year years yet you young younger youngest your yours z
    """.strip().split()
    STOP_LIST = [w.strip() for w in STOP_LIST]
    STOP_LIST = set(STOP_LIST)

    DOCUMENTS = []
    WORD_DOCUMENTS = defaultdict(set)
    DOCUMENT_TFIDS = []

    for i, club in enumerate(CLUBS):
        words = word_tokenize(club['mission'])
        words = [w.lower() for w in words if w not in STOP_LIST]
        words = [VOC.update(w) for w in words]

        DOCUMENTS.append(words)
        for w in words:
            WORD_DOCUMENTS[w].add(i)

    for i, club in enumerate(CLUBS):
        DOCUMENT_TFIDS.append(tfidf(DOCUMENTS[i]))

    app.run()
