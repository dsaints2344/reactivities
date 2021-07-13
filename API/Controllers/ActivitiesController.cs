using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Activities;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {

        //GET: api/activities/
        [HttpGet]
        public async Task<IActionResult> GetActivities()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        // GET: api/activities/id:
        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        // POST: api/activites/
        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity){

            return HandleResult(await Mediator.Send(new Create.Command {Activity = activity}));
        }

        //PUT: api/activities/id:
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity){

            activity.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Activity = activity}));
        }

        //DELETE: api/activities/id
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id){

            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}