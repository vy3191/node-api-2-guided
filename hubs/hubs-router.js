const express = require('express');
const hubs = require("./hubs-model")
const router = express.Router({mergeParams:true});

router.get("/", (req, res) => {
	console.log(req.query)
	hubs.find()
		.then((hubs) => {
			res.status(200).json(hubs)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error retrieving the hubs",
			})
		})
})

router.get("/:id", (req, res) => {
	hubs.findById(req.params.id)
		.then((hub) => {
			if (hub) {
				res.status(200).json(hub)
			} else {
				res.status(404).json({
					message: "Hub not found",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error retrieving the hub",
			})
		})
})

router.post("/", (req, res) => {
	if (!req.body.name) {
		return res.status(400).json({
			message: "Missing hub name",
		})
	}

	hubs.add(req.body)
		.then((hub) => {
			res.status(201).json(hub)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error adding the hub",
			})
		})
})

router.put("/:id", (req, res) => {
	if (!req.body.name) {
		return res.status(400).json({
			message: "Missing hub name",
		})
	}

	hubs.update(req.params.id, req.body)
		.then((hub) => {
			if (hub) {
				res.status(200).json(hub)
			} else {
				res.status(404).json({
					message: "The hub could not be found",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error updating the hub",
			})
		})
})

router.delete("/:id", (req, res) => {
	hubs.remove(req.params.id)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({
					message: "The hub has been nuked",
				})
			} else {
				res.status(404).json({
					message: "The hub could not be found",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error removing the hub",
			})
		})
})

router.get("/:id/messages", (req,res) => {
  hubs.findHubMessages(req.params.id)
      .then(msg => {
        res.json(msg);
      })
      .catch(err => {
        res.status(500).json({msg:err});
      })
});

router.get("/:hubId/messages/:messageId", (req,res) => {
   hubs.findHubMessageById(req.params.hubId,req.params.messageId)
       .then( message => {
          if(!message) res.status(404).json({msg:'There is no message with this id'});
          res.json(message);
       })
       .catch(err => {
        res.status(500).json({msg:err});
      })
});

router.post("/:id/messages", (req,res) => {
   const {id} = req.params;
   const{ sender, text} = req.body;
   if(!sender || !text) res.status(400).json({msg: 'Either sender or text is missing'});
   hubs.addHubMessage(id, {sender,text})
       .then( response => {
          res.status(201).json(response);
       })
       .catch(err => {
        res.status(500).json({msg:err});
      });
})

module.exports = router;