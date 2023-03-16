let stage = new Stage()

let objectGrid = new Grid({
    grid_location: {x: 50, y: 50},
    grid_dimensions: {
        x_size: 5,
        y_size: 2
    },
    cell_size: {
        x_size: 90,
        y_size: 120
    }
})

objectGrid.hide_grid_lines()

stage.add(objectGrid)

let specialProxyObjectMap = {} // Keeping track of object locations
let generalProxyObjectMap = {}

specialMembers = Subduction$0.join(special)
    .join(members)
    .tuples()
    .map((member) => member.atoms()[0])

// Unfortunately hard-coding for now. 
specialMembers = [specialMembers[0], specialMembers[2], specialMembers[1]]

specialMembers
    .forEach((member, i) => {
    let circ = new Circle({
        radius: 20,
        color: "white",
        borderWidth: 2,
        borderColor: "black",
        labelSize: 9,
        label: member.id().slice(0, -2)
    })
    specialProxyObjectMap[member.id()] = circ
    objectGrid.add({
        x: 1 + i,
        y: 0
    }, circ)
})

Subduction$0.join(general)
    .join(members)
    .tuples()
    .map((member) => member.atoms()[0])
    .forEach((member, i) => {
    let circ = new Circle({
        radius: 20,
        color: "white",
        borderWidth: 2,
        borderColor: "black",
        labelSize: 9,
        label: member.id().slice(0, -2)
    })
    generalProxyObjectMap[member.id()] = circ
    objectGrid.add({
        x: i,
        y: 1
    }, circ)
})


console.log(specialProxyObjectMap)
console.log(generalProxyObjectMap)

Subduction$0.join(general)
    .join(links).tuples().map(member => member.atoms()[0])
    .forEach((link) => {
        let source = Subduction$0
            .join(general)
            .join(outLinks)
            .join(link)
            .tuples()
            .map(tuple => tuple.atoms()[0])[0]

        let sink = Subduction$0
            .join(general)
            .join(inLinks)
            .join(link)
            .tuples()
            .map(tuple => tuple.atoms()[0])[0]

        let edge = new Edge({
            obj1: generalProxyObjectMap[source.id()],
            obj2: generalProxyObjectMap[sink.id()],
            lineProps: {
                arrow: true,
                width: 2,
            },
            textProps: {
                text: link.id().slice(0, -2),
                fontSize: 9
            },
            textLocation: "clockwise"
        })

        stage.add(edge)
    })

// Can probably factor this into function
Subduction$0.join(special)
    .join(links).tuples().map(member => member.atoms()[0])
    .forEach((link) => {
        let source = Subduction$0
            .join(special)
            .join(outLinks)
            .join(link)
            .tuples()
            .map(tuple => tuple.atoms()[0])[0] ?? 
            Subduction$0
            .join(general)
            .join(inLinks)
            .join(link)
            .tuples()
            .map(tuple => tuple.atoms()[0])[0]

        let sink = Subduction$0
            .join(special)
            .join(inLinks)
            .join(link)
            .tuples()
            .map(tuple => tuple.atoms()[0])[0] ??
            Subduction$0
            .join(general)
            .join(inLinks)
            .join(link)
            .tuples()
            .map(tuple => tuple.atoms()[0])[0]

        console.log(source, sink)
        
        let edge = new Edge({
            obj1: specialProxyObjectMap[source.id()] ?? generalProxyObjectMap[source.id()],
            obj2: specialProxyObjectMap[sink.id()] ?? generalProxyObjectMap[sink.id()],
            lineProps: {
                arrow: true,
                width: 2,
            },
            textProps: {
                text: link.id().slice(0, -2),
                fontSize: 9
            },
            textLocation: "clockwise"
        })

        stage.add(edge)
    })

Subduction$0
    .join(layering)
    .join(attachments)
    .tuples().map((attachment) => {
        source = attachment.atoms()[0]
        sink = attachment.atoms()[1]
        let edge = new Edge({
                obj1: specialProxyObjectMap[source.id()],
                obj2: generalProxyObjectMap[sink.id()],
                lineProps: {
                    arrow: true,
                    width: 2,
                }
            })

        stage.add(edge)
    })

stage.render(svg, document)